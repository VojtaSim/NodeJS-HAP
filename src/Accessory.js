const validateUUID = require('uuid-validate');
const glob = require('glob');
const debug = require('debug')('Accessory');
const crypto = require('crypto');
const EventEmitter = require('events');
const HAPServer = require('./server/HAPServer');
const Service = require('./Service');
const Characteristic = require('./Characteristic');
const Advertiser = require('./Advertiser');
const AccessoryCache = require('./cache/AccessoryCache');
const IdentifierCache = require('./cache/IdentifierCache');
const nodeCleanup = require('node-cleanup');

/**
 * Accessory is a virtual HomeKit device. It can publish an associated HAP server for iOS devices to communicate
 * with - or it can run behind another "Bridge" Accessory server.
 *
 * Bridged Accessories in this implementation must have a UUID that is unique among all other Accessories that
 * are hosted by the Bridge. This UUID must be "stable" and unchanging, even when the server is restarted. This
 * is required so that the Bridge can provide consistent "Accessory IDs" (aid) and "Instance IDs" (iid) for all
 * Accessories, Services, and Characteristics for iOS clients to reference later.
 * 
 * @extends {EventEmitter}
 * 
 * @event 'identify' => function(paired, callback(err)) { }
 *        Emitted when an iOS device wishes for this Accessory to identify itself. If `paired` is false, then
 *        this device is currently browsing for Accessories in the system-provided "Add Accessory" screen. If
 *        `paired` is true, then this is a device that has already paired with us. Note that if `paired` is true,
 *        listening for this event is a shortcut for the underlying mechanism of setting the `Identify` Characteristic:
 *        `getService(Service.AccessoryInformation).getCharacteristic(Characteristic.Identify).on('set', ...)`
 *        You must call the callback for identification to be successful.
 * 
 * @event 'service-characteristic-change' => function({service, characteristic, oldValue, newValue, context}) { }
 *        Emitted after a change in the value of one of the provided Service's Characteristics.
 */
class Accessory extends EventEmitter {

	/**
	 * Loads {@code Accessory} instances from a files that match specified
	 * search pattern.
	 *
	 * @static
	 * @memberof Accessory
	 * @param {string} searchPattern
	 * @returns {Accessory[]}
	 */
	static load(searchPattern) {
		const accessories = [];
		const accessoryFiles = glob.sync(searchPattern, { absolute: true });

		accessoryFiles.forEach(file => {
			let loadedAccessory = require(file);

			if (!Array.isArray(loadedAccessory)) {
				loadedAccessory = [loadedAccessory];
			}
			accessories.push(...loadedAccessory);
		});

		return accessories.filter(accessory => accessory instanceof Accessory);
	}

	/**
	 * @param {string} accessoryUUID The UUID string identifying the accessory
	 * @param {Object} accessoryInfo An Object containing basic info about this accessory
	 */
	constructor(accessoryUUID, accessoryInfo) {
		super();

		if (!(accessoryUUID && validateUUID(accessoryUUID))) {
			throw new Error("Accessories must be created with a valid UUID.");
		}

		if (!(this._cache = AccessoryCache.load(accessoryUUID))) {
			this._cache = AccessoryCache.create(accessoryUUID);
		}

		this._isBridge = false; // true if we are a Bridge (creating a new instance of the Bridge subclass sets this to true)
		this._shouldPurgeUnusedIDs = true; // Purge unused ids by default

		this.uuid = accessoryUUID;
		this.info = accessoryInfo;
		this.aid = null; // assigned by us in assignIDs() or by a Bridge
		this.bridged = false; // true if we are hosted "behind" a Bridge Accessory
		this.services = []; // of Services

		// create our initial "Accessory Information" Service that all Accessories are expected to have
		this
			.addService(Service.AccessoryInformation)
			.setCharacteristicValue(Characteristic.Name, this.info.displayName)
			.setCharacteristicValue(Characteristic.Manufacturer, "Default-Manufacturer")
			.setCharacteristicValue(Characteristic.Model, "Default-Model")
			.setCharacteristicValue(Characteristic.SerialNumber, "Default-SerialNumber")
			.setCharacteristicValue(Characteristic.FirmwareRevision, "1.0");

		// sign up for when iOS attempts to "set" the Identify characteristic - this means a paired device wishes
		// for us to identify ourselves (as opposed to an unpaired device - that case is handled by HAPServer 'identify' event)
		this
			.getService(Service.AccessoryInformation)
			.getCharacteristic(Characteristic.Identify)
			.onSet(async () => await this.handleIdentify(true));
	}

	/**
	 * Constructs URL used to pair iOS device with this accessory. URL can be 
	 * later inserted into a QR code for easier pairing.
	 * 
	 * @returns {string}
	 */
	get setupURL() {
		const { pincode, category, displayName } = this.info;
		const { setupID } = this.cache;

		if (!(pincode && setupID)) {
			debug(`[${displayName}] Cannot get setupURL because pin-code and setupID are unknown.`);
			return;
		}

		if (this._setupURL) {
			return this._setupURL;
		}

		const buffer = Buffer.alloc(8);
		const setupCode = parseInt(pincode.replace(/-/g, ''), 10);

		let value_low = setupCode;
		let value_high = category >> 1;

		value_low |= 1 << 28; // Supports IP;

		buffer.writeUInt32BE(value_low, 4);

		if (category & 1) {
			buffer[4] = buffer[4] | 1 << 7;
		}

		buffer.writeUInt32BE(value_high, 0);

		let encodedPayload = (
			buffer.readUInt32BE(4) +
			(buffer.readUInt32BE(0) * Math.pow(2, 32))
		).toString(36).toUpperCase();

		if (encodedPayload.length != 9) {
			for (let i = 0; i <= 9 - encodedPayload.length; i++) {
				encodedPayload = '0' + encodedPayload;
			}
		}

		return (this._setupURL = 'X-HM://' + encodedPayload + setupID);
	}

	/**
	 * 
	 *
	 * @returns {AccessoryCache}
	 */
	get cache() {
		return this._cache;
	}

	/**
	 * Appends the given service to this accessory and sets up event listeners
	 * to handle config and characteristics change.
	 * 
	 * @param {Function|Service} service 
	 */
	addService(service, ...args) {

		// service might be a constructor like `Service.AccessoryInformation` 
		// instead of an instance of Service. Coerce if necessary.
		if (typeof service === 'function') {
			service = new (Function.prototype.bind.apply(service, args));
		}

		// check for UUID+subtype conflict
		const duplicitService = this.services
			.find(existingService => existingService.uuid === service.UUID);

		if (duplicitService) {
			// OK we have two Services with the same UUID. Check that each 
			// defines a `subtype` property and that each is unique.
			if (!service.subtype) {
				throw new Error(`Cannot add a Service with the same UUID '${duplicitService.UUID}' as another Service in this Accessory without also defining a unique 'subtype' property.`);
			}

			if (service.subtype.toString() === duplicitService.subtype.toString()) {
				throw new Error(`Cannot add a Service with the same UUID '${duplicitService.UUID}' and subtype '${duplicitService.subtype}' as another Service in this Accessory.`);
			}
		}

		this.services.push(service);

		if (!this.bridged) {
			this._checkAndUpdateConfiguration();
		} else {
			this.emit(
				'service-configurationChange',
				Object.assign({}, { accessory: this, service })
			);
		}

		// setup listener for service configuration change
		service.on('service-configurationChange', change => {
			if (!this.bridged) {
				this._checkAndUpdateConfiguration();
			} else {
				// the accessory is bridged - bubble the event up
				this.emit(
					'service-configurationChange',
					Object.assign({}, { accessory: this, service })
				);
			}
		});

		// listen for changes in characteristics and bubble them up
		service.on('characteristic-change', change => {
			this.emit(
				'service-characteristic-change',
				Object.assign({}, change, { service })
			);

			// if we're not bridged, when we'll want to process this event through our HAPServer
			if (!this.bridged) {
				this._handleCharacteristicChange(
					Object.assign({}, change, { accessory: this, service })
				);
			}
		});

		return service;
	}

	/**
	 * If the given service exists in the list of services in this accessory
	 * marks it as primary.
	 * 
	 * @param {Function|Service} service 
	 */
	setPrimaryService(service) {
		const targetServiceIndex = this.services
			.findIndex(otherService => otherService === service);

		if (!~targetServiceIndex) {
			return;
		}

		// set other services as non-primary
		this.services.forEach(service => service.isPrimaryService = false);

		// set the target service as primary
		this.services[targetServiceIndex].isPrimaryService = true;

		if (!this.bridged) {
			this._checkAndUpdateConfiguration();
		} else {
			this.emit(
				'service-configurationChange',
				Object.assign({}, { accessory: this, service: service })
			);
		}
	}

	/**
	 * Removes the given service from the list of services registered for this
	 * accessory.
	 * 
	 * @param {Function|Service} service 
	 */
	removeService(service) {
		const targetServiceIndex = this.services
			.findIndex(otherService => otherService === service);

		if (!~targetServiceIndex) {
			return;
		}

		this.services.splice(targetServiceIndex, 1);

		if (!this.bridged) {
			this._checkAndUpdateConfiguration();
		} else {
			this.emit(
				'service-configurationChange',
				Object.assign({}, { accessory: this, service: service })
			);
		}

		service.removeAllListeners();
	}

	/**
	 * Find service in the list of registered accessories by the given name or
	 * if the name is Function|Service and it matches the service instance.
	 *
	 * @param {string|Function} name 
	 * @returns {Service}
	 */
	getService(name) {

		return this.services.find(service => {
			if (typeof name === 'string' && (service.displayName === name || service.name === name || service.subtype === name)) {
				return true;
			} else if (typeof name === 'function' && ((service instanceof name) || (name.UUID === service.UUID))) {
				return true;
			}
		});
	}

	/**
	 * Iterates over the list of services and tries to find a characteristic by
	 * the given IID in the service.
	 * 
	 * @param {string} iid
	 * @returns {Characteristic|undefined}
	 */
	getCharacteristicByIID(iid) {
		return this.services
			.map(service => service.getCharacteristicByIID(iid))
			.find(characteristic => characteristic !== undefined);
	}

	/**
	 * Find characteristic in an accessory by given aid (accessory ID) and IID
	 *
	 * @param {string} aid
	 * @param {string} iid
	 * @returns {Characteristic|undefined}
	 */
	findCharacteristic(aid, iid) {

		// if aid === 1, the accessory is us (because we are the server), otherwise find it among our bridged
		// accessories (if any)
		const accessory = (aid === 1) ? this : this.getBridgedAccessoryByAID(aid);

		return accessory && accessory.getCharacteristicByIID(iid);
	}

	/**
	 * Returns a JSON representation of this Accessory suitable for delivering 
	 * to HAP clients.
	 *
	 * @param {{ omitValues: boolean }} options
	 * @returns Array<{ aid: string, services: Array<Object> }>
	 */
	toHAP(options) {
		const servicesHAP = [];

		this.services.forEach(
			service => servicesHAP.push(service.toHAP(options))
		);

		const accessoriesHAP = [{
			aid: this.aid,
			services: servicesHAP
		}];

		return accessoriesHAP;
	}

	/**
	 * Manually purge the unused ids if you like, comes handy
	 * when you have disabled auto purge so you can do it manually
	 */
	purgeUnusedIDs() {
		// Cache the state of the purge mechanisam and set it to true
		const oldValue = this._shouldPurgeUnusedIDs;
		this._shouldPurgeUnusedIDs = true;

		// Reassign all ids
		this._assignIDs(this._identifierCache);

		// Revert back the purge mechanisam state
		this._shouldPurgeUnusedIDs = oldValue;
	}

	/**
	 * Disable purging of unused IDs
	 */
	disableUnusedIDPurge() {
		this._shouldPurgeUnusedIDs = false;
	}

	/**
	 * Enable purging of unused IDs
	 */
	enableUnusedIDPurge() {
		this._shouldPurgeUnusedIDs = true;
	}

	/**
	 * Publishes this Accessory on the local network for iOS clients to communicate with.
	 *
	 * @param {Object} info - Required info for publishing.
	 * @param {string} info.username - The "username" (formatted as a MAC address - like "CC:22:3D:E3:CE:F6") of
	 *                                this Accessory. Must be globally unique from all Accessories on your local network.
	 * @param {string} info.pincode - The 8-digit pincode for clients to use when pairing this Accessory. Must be formatted
	 *                               as a string like "031-45-154".
	 */
	publish(info = {}, allowInsecureRequest = false) {
		this.info = Object.assign({}, this.info, info);

		// create our IdentifierCache so we can provide clients with stable aid/iid's
		if (!(this._identifierCache = IdentifierCache.load(this.uuid))) {
			// if we don't have one, create a new one.
			debug("[%s] Creating new IdentifierCache", this.info.displayName);
			this._identifierCache = new IdentifierCache(this.uuid);
		}

		// If it's bridge and there are not accessories already assigned to the 
		// bridge probably purge is not needed since it's going to delete all
		// the ids of accessories that might be added later. Useful when 
		// dynamically adding accessories.
		if (this._isBridge && this.bridgedAccessories.length == 0) {
			this.disableUnusedIDPurge();
		}

		// assign aid/iid
		this._assignIDs(this._identifierCache);

		// Check if configuration has changed and update config hash if so
		this._checkAndUpdateConfiguration();

		// create our Advertiser which broadcasts our presence over mdns
		this._advertiser = new Advertiser(this.info, this.cache);

		// create our HAP server which handles all communication between iOS devices and us
		this._server = new HAPServer(this, allowInsecureRequest);
		this._server.on(
			'server-listening',
			port => this._onServerListening(port)
		);
		this._server.on(
			'server-connection-close',
			(connection, events) => this._onServerConnectionClose(events)
		);
		this._server.on(
			'server-stop',
			() => this._onServerStop()
		);

		this._server.listen(this.info.port || 0);

		nodeCleanup((code, signal) => this.unpublish());
	}

	/**
	 * Removes this Accessory from the local network
	 * Accessory object will no longer vaild after invoking this method
	 * Trying to invoke publish() on the object will result undefined behavior
	 */
	destroy() {
		this.unpublish();
		if (this._cache) {
			this._cache.remove();
			this._cache = undefined;
		}
		if (this._identifierCache) {
			this._identifierCache.remove();
			this._identifierCache = undefined;
		}
	}

	/**
	 *
	 *
	 * @memberof Accessory
	 */
	unpublish() {
		if (this._server) {
			this._server.stop();
		}

		if (this._advertiser) {
			this._advertiser.stopAdvertising();
		}
	}

	/**
	 * Called when HAPServer receives a request to identify specific accessory
	 * (the accessory is always unpaired in this case) or AccessoryInformation
	 * service triggers the identify request (it this case the accessory is
	 * already paired).
	 *
	 * @param {boolean} isPaired
	 * @fires 'identify' Event fired to let external listeners identify the
	 * 					 accessory.
	 * @returns {boolean}
	 * @memberof Accessory
	 */
	async handleIdentify(isPaired) {
		debug(`[${this.info.displayName}] Identifying this accessory`);
		this.emit('identify', isPaired);

		return true;
	}

	/**
	 * Called when HAPServer has completed the pairing process with a client
	 *
	 * @param {string} username 
	 * @param {Buffer} publicKey 
	 */
	async handlePair(username, publicKey) {
		debug(`[${this.info.displayName}] Paired with client ${username}`);

		this.cache.addPairedClient(username, publicKey);
		this.cache.save();

		// update our advertisement so it can pick up on the paired status of AccessoryCache
		this._advertiser.updateAdvertisement();
	}

	/**
	 * Called when HAPServer wishes to remove/unpair the pairing information of a client
	 *
	 * @param {string} username 
	 */
	async handleUnpair(username) {
		debug(`[${this.info.displayName}] Unpairing with client ${username}`);

		// Unpair
		this._cache.removePairedClient(username);
		this._cache.save();

		// update our advertisement so it can pick up on the paired status of AccessoryCache
		this._advertiser.updateAdvertisement();
	}

	/**
	 * Called when an iOS client wishes to know all about our accessory via JSON payload.
	 * 
	 * @returns {Object} The HAP representation of this accessory.
	 */
	async handleGetInfo() {

		// make sure our aid/iid's are all assigned
		this._assignIDs(this._identifierCache);

		return { accessories: this.toHAP() };
	}

	/**
	 * Called when an iOS client wishes to query the state of one or more characteristics, like "door open?", "light on?", etc.
	 *
	 * @param {Array<{ aid: number, iid: number }} data
	 * @param {Object} events
	 * @param {String} connectionID
	 * @returns {Promise<Object>}
	 */
	async handleGetCharacteristics(data, events, connectionID) {
		// traverse through the requested characteristics and asynchronously obtain value for each one.
		return Promise.all(data.map(async characteristicData => {
			const { aid, iid } = characteristicData;
			const characteristic = this.findCharacteristic(aid, iid);

			if (!characteristic) {
				debug(`[${this.info.displayName}] Could not find a Characteristic with IID = ${iid} and AID = ${aid}`);
				return { status: HAPServer.Status.SERVICE_COMMUNICATION_FAILURE, aid, iid };
			}
			try {
				const value = await characteristic.getValue(events, connectionID);
				debug(`[${this.info.displayName}] Got Characteristic '${characteristic.displayName}' value: ${value}`);

				// compose the response and add it to the list
				return { status: HAPServer.Status.SUCCESS, value, aid, iid };

			} catch (error) {
				debug(`[${this.info.displayName}] Error getting value for Characteristic '${characteristic.displayName}': ${error.message}`);
				return { status: hapStatus(error), aid, iid };
			}
		}));
	}

	/**
	 * Called when an iOS client wishes to change the state of this accessory - like opening a door, or turning on a light.
	 * Or, to subscribe to change events for a particular Characteristic.
	 * 
	 * @param {Array<{ aid: number, iid: number }} data
	 * @param {Object} events
	 * @param {String} connectionID
	 * @returns {Promise<Object>}
	 */
	async handleSetCharacteristics(data, events, connectionID) {
		debug("[%s] Processing characteristic set: %s", this.info.displayName, JSON.stringify(data));

		return Promise.all(data.map(async characteristicData => {
			const { aid, iid, value, ev } = characteristicData;
			const characteristic = this.findCharacteristic(aid, iid);

			if (!characteristic) {
				debug(`[${this.info.displayName}] Could not find a Characteristic with IID = ${iid} and AID = ${aid}`);
				return { status: HAPServer.Status.SERVICE_COMMUNICATION_FAILURE, aid, iid };
			}

			// if "ev" is present, that means we need to register or unregister this client for change events for
			// this characteristic.
			if (ev !== undefined) {
				debug(`[${this.info.displayName}] ${ev ? 'Registering' : 'Unregistering'} characteristic '${characteristic.displayName}' for events`);

				// store event registrations in the supplied "events" dict which is associated with the connection making
				// the request.
				const eventName = `${aid}.${iid}`;

				if (ev === true && events[eventName] != true) {
					events[eventName] = true; // value is arbitrary, just needs to be non-falsey
					characteristic.subscribe();
				}
				if (ev === false && events[eventName] != undefined) {
					characteristic.unsubscribe();
					delete events[eventName]; // unsubscribe by deleting name from dict
				}
			}

			// Found the characteristic - set the value if there is one
			if (value !== undefined) {
				debug(`[${this.info.displayName}] Setting Characteristic '${characteristic.displayName}' to value ${value}`);

				try {
					await characteristic.setValue(value, events, connectionID);
					return { status: HAPServer.Status.SUCCESS, aid, iid };

				} catch (error) {
					debug(`[${this.info.displayName}] Error setting Characteristic '${characteristic.displayName}' to value ${value}: ${err.message}`);
					return { status: hapStatus(error), aid, iid };
				}
			} else {
				return { status: HAPServer.Status.SUCCESS, aid, iid };
			}
		}));
	}

	/**
	 * Assigns aid/iid to ourselves, any Accessories we are bridging, and all 
	 * associated Services+Characteristics. Uses the provided identifierCache 
	 * to keep IDs stable.
	 * 
	 * @param {IdentifierCache} identifierCache
	 */
	_assignIDs(identifierCache) {

		// if we are responsible for our own identifierCache, start the 
		// expiration process also check weather we want to have an expiration 
		// process.
		if (this._identifierCache && this._shouldPurgeUnusedIDs) {
			this._identifierCache.startTrackingUsage();
		}

		if (this.bridged) {
			// This Accessory is bridged, so it must have an aid > 1. Use the 
			// provided identifierCache to fetch or assign one based on our UUID.
			this.aid = identifierCache.getAID(this.uuxid);
		} else {
			// Since this Accessory is the server (as opposed to any 
			// Accessories that may be bridged behind us), we must have aid = 1
			this.aid = 1;
		}

		this.services.forEach(
			service => service._assignIDs(identifierCache, this.uuid)
		);

		// expire any now-unused cache keys (for Accessories, Services, or Characteristics
		// that have been removed since the last call to assignIDs())
		if (this._identifierCache) {
			// Check weather we want to purge the unused ids
			if (this._shouldPurgeUnusedIDs) {
				this._identifierCache.stopTrackingUsageAndExpireUnused();
			}
			// Save in case we have new ones
			this._identifierCache.save();
		}
	}

	/**
	 * Get the accessory information in HAP format and determine if the
	 * configuration (that is, our Accessories/Services/Characteristics) has
	 * changed since the last time we were published. make sure to omit actual
	 * values since these are not part of the "configuration".
	 */
	_checkAndUpdateConfiguration() {
		const config = this.toHAP({ omitValues: true });

		// now convert it into a hash code and check it against the last one we made, if we have one
		const shasum = crypto.createHash('sha1');
		shasum.update(JSON.stringify(config));
		const configHash = shasum.digest('hex');

		if (configHash !== this._cache.configHash) {
			// our configuration has changed! we'll need to bump our config version number
			this._cache.configVersion++;
			this._cache.configHash = configHash;

			return this._cache.save();
		}

		if (this._advertiser && this._advertiser.isAdvertising()) {
			// update our advertisement so HomeKit on iOS can pickup new accessory
			this._advertiser.updateAdvertisement();
		}
	}

	/**
	 * Handles server-listening event and starts advertising our info
	 * 
	 * @param {number} port
	 * @fires 'ready' Event fired to let know everyone this accessory is now
	 * 				  ready to be paired.
	 */
	_onServerListening(port) {
		// the HAP server is listening, so we can now start advertising our presence.
		if (this._advertiser) {
			this._advertiser.startAdvertising(port);
		}
		this.emit('ready', port);
	}

	/**
	 * Handles server-connection-close
	 *
	 * @param {Object} events 
	 */
	_onServerConnectionClose(events) {
		let characteristic;

		Object.keys(events)
			.filter(eventName => eventName.includes('.'))
			.forEach(eventName => {
				try {
					const [aid, iid] = eventName.split('.').map(id => parseInt(id));

					if (characteristic = this.findCharacteristic(aid, iid)) {
						characteristic.unsubscribe();
					}
				} catch (error) { }
			});
	}

	/**
	 * Handles server-stop
	 */
	_onServerStop() {

	}

	/**
	 * Called internally above when a change was detected in one of our hosted
	 * Characteristics somewhere in our hierarchy.
	 *
	 * @param {{ 
	 * 			accessory: Accessory, 
	 * 			characteristic: Characteristic, 
	 * 			newValue: any,
	 * 			context: Object
	 * 		}} change 
	 */
	_handleCharacteristicChange(change) {
		if (!this._server) {
			return; // we're not running a HAPServer, so there's no one to notify about this event
		}

		const { accessory, characteristic, newValue, context } = change;
		const data = {
			characteristics: [{
				aid: accessory.aid,
				iid: characteristic.iid,
				value: newValue
			}]
		};

		// name for this event that corresponds to what we stored when the 
		// client signed up (in handleSetCharacteristics)
		const eventName = `${accessory.aid}.${characteristic.iid}`

		// pull the events object associated with the original connection 
		// (if any) that initiated the change request, which we assigned in
		// handleGetCharacteristics/handleSetCharacteristics.
		const excludeEvents = context;

		// pass it along to notifyClients() so that it can omit the connection
		// where events === excludeEvents.
		this._server.notifyClients(eventName, data, excludeEvents);
	}
}

// Known category values. Category is a hint to iOS clients about what "type" of Accessory this represents, for UI only.
Accessory.Categories = {
	OTHER: 1,
	BRIDGE: 2,
	FAN: 3,
	GARAGE_DOOR_OPENER: 4,
	LIGHTBULB: 5,
	DOOR_LOCK: 6,
	OUTLET: 7,
	SWITCH: 8,
	THERMOSTAT: 9,
	SENSOR: 10,
	ALARM_SYSTEM: 11,
	SECURITY_SYSTEM: 11, //Added to conform to HAP naming
	DOOR: 12,
	WINDOW: 13,
	WINDOW_COVERING: 14,
	PROGRAMMABLE_SWITCH: 15,
	RANGE_EXTENDER: 16,
	CAMERA: 17,
	IP_CAMERA: 17, //Added to conform to HAP naming
	VIDEO_DOORBELL: 18,
	AIR_PURIFIER: 19,
	AIR_HEATER: 20, //Not in HAP Spec
	AIR_CONDITIONER: 21, //Not in HAP Spec
	AIR_HUMIDIFIER: 22, //Not in HAP Spec
	AIR_DEHUMIDIFIER: 23, // Not in HAP Spec
	APPLE_TV: 24,
	SPEAKER: 26,
	AIRPORT: 27,
	SPRINKLER: 28,
	FAUCET: 29,
	SHOWER_HEAD: 30
}

function hapStatus(err) {

	// Validate that the message is a valid HAPServer.Status
	var value = 0;  // default if not found or

	for (const k in HAPServer.Status) {
		if (HAPServer.Status[k] == err.message) {
			value = err.message;
			break;
		}
	}

	if (value == 0)
		value = HAPServer.Status.SERVICE_COMMUNICATION_FAILURE;  // default if not found or 0

	return (parseInt(value));
}

module.exports = Accessory;
