const Accessory = require('./Accessory');

/**
 * Bridge is a special type of HomeKit Accessory that hosts other Accessories "behind" it. This way you
 * can simply publish() the Bridge (with a single HAPServer on a single port) and all bridged Accessories
 * will be hosted automatically, instead of needed to publish() every single Accessory as a separate server.
 * 
 * @extends {Accessory}
 */
class Bridge extends Accessory {

	/**
	 * @inheritdoc
	 */
	constructor(accessoryUUID, accessoryInfo) {
		super(accessoryUUID, accessoryInfo);

		this._isBridge = true;
		this.bridgedAccessories = []; // If we are a Bridge, these are the Accessories we are bridging
	}

	/**
	 * Adds a child accessory to the bridge.
	 * Binds listeners for all necessary event emitted by the given accessory
	 * and translates those events to this bridge.
	 * 
	 * @param {Accessory} accessory 		The bridged accessory
	 * @param {boolean} [deferUpdate=false]	Whether to defer updating the
	 * 										configuration.
	 * @returns {Accessory}
	 */
	addBridgedAccessory(accessory, deferUpdate = false) {
		if (Array.isArray(accessory)) {
			accessory = accessory.map(accessory => this.addBridgedAccessory(accessory, true));
			this._checkAndUpdateConfiguration();

			return accessory;
		}
		if (accessory._isBridge) {
			throw new Error("Cannot Bridge another Bridge!");
		}

		// Check for UUID conflict
		const duplicitAccessory = this.bridgedAccessories
			.find(otherAccessory => otherAccessory.UUID === accessory.UUID);

		if (duplicitAccessory) {
			throw new Error(`Cannot add a bridged Accessory with the same UUID as another bridged Accessory: ${duplicitAccessory.UUID}`);
		}

		// Listen for changes in ANY characteristics of ANY services on this Accessory
		accessory.on('service-characteristic-change', change => {
			this._handleCharacteristicChange(Object.assign({}, change, { accessory }));
		});

		accessory.on('service-configurationChange', change => {
			this._checkAndUpdateConfiguration();
		});

		accessory.bridged = true;
		this.bridgedAccessories.push(accessory);

		if (!deferUpdate) {
			this._checkAndUpdateConfiguration();
		}

		return accessory;
	}

	/**
	 * Returns an accessory found by given AID.
	 *
	 * @param {number} aid 				The Accessory ID
	 * @returns {Accessory|undefined}
	 */
	getBridgedAccessoryByAID(aid) {

		return this.bridgedAccessories
			.find(accessory => accessory.aid === aid);
	}

	/**
	 * Removes the accessory from the list of bridged accessories.
	 *
	 * @param {Accessory|Accessory[]} accessory The accessory or list of accessories to remove.
	 * @param {boolean} [deferUpdate=false]		Whether to defer updating the
	 * 											configuration.
	 */
	removeBridgedAccessory(accessory, deferUpdate = false) {
		if (Array.isArray(accessory)) {
			accessory.forEach(accessory => this.removeBridgedAccessory(accessory, true));
			return this._checkAndUpdateConfiguration();
		}

		const existingAccessoryIndex = this.bridgedAccessories
			.findIndex(otherAccessory => otherAccessory.UUID === accessory.UUID);

		if (!~existingAccessoryIndex) {
			throw new Error("Cannot find the bridged Accessory to remove.");
		}

		this.bridgedAccessories.splice(existingAccessoryIndex, 1);
		accessory.removeAllListeners();

		if (!deferUpdate) {
			this._checkAndUpdateConfiguration();
		}
	}

	/**
	 * Removes all registered accessories we're bridging.
	 */
	removeAllBridgedAccessories() {
		this.removeBridgedAccessory(this.bridgedAccessories);
	}

	/**
	 * @inheritdoc
	 */
	toHAP(opt) {
		const accessoriesHAP = super.toHAP(opt);
	
		// now add any Accessories we are bridging
		this.bridgedAccessories.forEach(accessory => {
			const bridgedAccessoryHAP = accessory.toHAP(opt);

			// bridgedAccessoryHAP is an array of accessories with one item - 
			// extract it and add it to our own array
			accessoriesHAP.push(bridgedAccessoryHAP[0]);
		});

		return accessoriesHAP;
	}

	/**
	 * @inheritdoc
	 */
	_assignIDs(identifierCache) {

		// if we are responsible for our own identifierCache, start the 
		// expiration process also check weather we want to have an expiration 
		// process.
		if (this._identifierCache && this._shouldPurgeUnusedIDs) {
			this._identifierCache.startTrackingUsage();
		}

		// Since this Accessory is the server (as opposed to any 
		// Accessories that may be bridged behind us), we must have aid = 1
		this.aid = 1;

		this.services.forEach(
			service => service._assignIDs(identifierCache, this.UUID, 2000000000)
		);

		// now assign IDs for any Accessories we are bridging
		this.bridgedAccessories.forEach(
			accessory => accessory._assignIDs(identifierCache)
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
	 * @inheritdoc
	 */
	_onServerListening(port) {
		super._onServerListening(port);

		// Propagate event to bridged accessories
		this.bridgedAccessories.forEach(accessory => {
			accessory._onServerListening(port);
		});
	}

	/**
	 * @inheritdoc
	 */
	_onServerConnectionClose(events) {
		super._onServerConnectionClose(events);

		// Propagate event to bridged accessories
		this.bridgedAccessories.forEach(accessory => {
			// passing empty object instead of event on purpose - all events have
			// been registered in a Bridge
			accessory._onServerConnectionClose({});
		});
	}
}

module.exports = Bridge;
