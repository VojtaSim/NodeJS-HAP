const EventEmitter = require('events');
const Characteristic = require('./Characteristic');

/**
 * Service represents a set of grouped values necessary to provide a logical
 * function. For instance, a "Door Lock Mechanism" service might contain two
 * values, one for the "desired lock state" and one for the "current lock
 * state". A particular Service is distinguished from others by its "type",
 * which is a UUID. HomeKit provides a set of known Service UUIDs defined in
 * HomeKitTypes.js along with a corresponding concrete subclass that you can
 * instantiate directly to setup the necessary values. These natively-supported
 * Services are expected to contain a particular set of Characteristics.
 *
 * Unlike Characteristics, where you cannot have two Characteristics with the
 * same UUID in the same Service, you can actually have multiple Services with
 * the same UUID in a single Accessory. For instance, imagine a Garage Door
 * Opener with both a "security light" and a "backlight" for the display. Each
 * light could be a "Lightbulb" Service with the same UUID. To account for this
 * situation, we define an extra "subtype" property on Service, that can be a
 * string or other string-convertible object that uniquely identifies the
 * Service among its peers in an Accessory. For instance, you might have
 * `service1.subtype = 'security_light'` for one and
 * `service2.subtype = 'backlight'` for the other.
 *
 * You can also define custom Services by providing your own UUID for the type
 * that you generate yourself. Custom Services can contain an arbitrary set of
 * Characteristics, but Siri will likely not be able to work with these.
 * 
 * @extends {EventEmitter}
 *
 * @event 'characteristic-change' => function({characteristic, oldValue, newValue, context}) { }
 *        Emitted after a change in the value of one of our Characteristics has occurred.
 */
class Service extends EventEmitter {

	/**
	 * @param {string} displayName
	 * @param {string} serviceUUID
	 * @param {string} [subType]
	 */
	constructor(displayName, serviceUUID, subType) {
		if (!serviceUUID) {
			throw new Error('Services must be created with a valid UUID.');
		}

		super();

		this.displayName = displayName;
		this.uuid = serviceUUID;
		this.subType = subType;
		this.iid = null; // assigned later by our containing Accessory
		this.characteristics = [];
		this.optionalCharacteristics = [];

		this.isHiddenService = false;
		this.isPrimaryService = false;
		this.linkedServices = [];

		// every service has an optional Characteristic.Name property - we'll
		// set it to our displayName if one was given if you don't provide a
		// display name, some HomeKit apps may choose to hide the device.
		if (displayName) {
			// create the characteristic if necessary
			const nameCharacteristic = (
				this.getCharacteristic(Characteristic.Name) ||
				this.addCharacteristic(Characteristic.Name)
			);

			nameCharacteristic.setValue(displayName);
		}
	}

	/**
	 * Constructs a new characteristic and adds it to the list of
	 * characteristics.
	 *
	 * @param {Function|Characteristic} characteristic
	 * @param {...any} arguments
	 * @returns {Characteristic}
	 */
	addCharacteristic(characteristic, ...args) {
		// characteristic might be a constructor like
		// `Characteristic.Brightness` instead of an instance of
		// Characteristic. Coerce if necessary.
		if (typeof characteristic === 'function') {
			characteristic = new (characteristic)(...args);
		}

		// check for UUID conflict
		for (const index in this.characteristics) {
			const existing = this.characteristics[index];
			if (existing.uuid === characteristic.UUID) {
				if (characteristic.UUID === '00000052-0000-1000-8000-0026BB765291') {
					//This is a special workaround for the Firmware Revision characteristic.
					return existing;
				}
				throw new Error(
					'Cannot add a Characteristic with the same UUID as ' +
					`another Characteristic in this Service: ${existing.uuid}`
				);
			}
		}

		// listen for changes in characteristics and bubble them up
		characteristic.on('change', change =>  {
			// make a new object with the relevant characteristic added, and bubble it up
			this.emit('characteristic-change', Object.assign({}, change, { characteristic }));
		});

		this.characteristics.push(characteristic);
		this.emit('service-configurationChange', { service: this });

		return characteristic;
	}

	/**
	 * Removes a characteristic from the list and unbinds all listeners
	 *
	 * @param {Characteristic} characteristic 
	 */
	removeCharacteristic(characteristic) {
		const targetCharacteristicIndex = this.characteristics
			.findIndex(existing => existing === characteristic);

		if (~targetCharacteristicIndex) {
			this.characteristics.splice(targetCharacteristicIndex, 1);
			characteristic.removeAllListeners();

			this.emit('service-configurationChange', { service: this });
		}
	}

	/**
	 * Returns a characteristic object from the service. If the characteristic
	 * is not found, but the type is in {@code optionalCharacteristics}, it
	 * adds the {@code characteristic.type} to the service and returns it.
	 *
	 * @param {string|Function|Characteristic} name
	 * @returns {Characteristic}
	 */
	getCharacteristic(name) {
		const characteristic = this.characteristics.find(characteristic => (
			(typeof name === 'string' && characteristic.displayName === name) ||
			(typeof name === 'function' && (
				(characteristic instanceof name) ||
				(name.UUID === characteristic.UUID)
			))
		));

		if (!characteristic && typeof name === 'function') {
			if (this.optionalCharacteristics.find(characteristic => (
				(characteristic instanceof name) ||
				(name.UUID === characteristic.UUID)
			))) {
				return this.addCharacteristic(name);
			}
			//Not found in optional Characteristics. Adding anyway, but warning about it if it isn't the Name.
			if (name !== Characteristic.Name) {
				console.warn(
					`HAP Warning: Characteristic ${name.UUID} not in required or ` +
					`optional characteristics for service ${this.uuid}. Adding anyway.`
				);
				return this.addCharacteristic(name);
			}
		}

		return characteristic;
	};

	/**
	 * Checks for the existence of a characteristic object in the service
	 *
	 * @param {string|Function|Characteristic} name
	 * @returns {boolean}
	 */
	hasCharacteristic(name) {
		return this.characteristics.some(characteristic => (
			(typeof name === 'string' && characteristic.displayName === name) ||
			(typeof name === 'function' && (
				(characteristic instanceof name) ||
				(name.UUID === characteristic.UUID)
			))
		));
	}

	/**
	 * Shortcut for obtaining characteristic value
	 *
	 * @param {string|Function|Characteristic} name
	 * @return {any}
	 */
	getCharacteristicValue(name) {
		return this.getCharacteristic(name).getValue();
	}

	/**
	 * Shortcut for setting characteristic value
	 *
	 * @param {string|Function|Characteristic} name
	 * @param {any} value
	 * @returns {this}
	 */
	setCharacteristicValue(name, value) {
		this.getCharacteristic(name).setValue(value);
		return this;
	}

	/**
	 * Shortcut for updating characteristic value
	 * 
	 * @param {string|Function|Characteristic} name 
	 * @param {any} value 
	 * @returns {this}
	 */
	updateCharacteristicValue(name, value) {
		this.getCharacteristic(name).updateValue(value);
		return this;
	}

	/**
	 * Adds new {@code Characteristic} to the list of optional characteristics
	 *
	 * @param {Function|Characteristic)} characteristic
	 */
	addOptionalCharacteristic(characteristic) {
		// characteristic might be a constructor like `Characteristic.Brightness` instead of an instance
		// of Characteristic. Coerce if necessary.
		if (typeof characteristic === 'function') {
			characteristic = new characteristic();
		}

		this.optionalCharacteristics.push(characteristic);
	}

	/**
	 * Finds a {@code Characteristic} by given IID
	 * 
	 * @param {string} iid
	 */
	getCharacteristicByIID(iid) {
		return this.characteristics
			.find(characteristic => characteristic.iid === iid);
	}

	/**
	 * Defines this {@code Service} as hidden.
	 * 
	 * @param {boolean} isHidden
	 */
	setHiddenService(isHidden) {
		this.isHiddenService = isHidden;
		this.emit('service-configurationChange', { service: this });
	}

	/**
	 * Allows setting other {@code Service}s that link to this one.
	 * 
	 * @param {Service} newLinkedService
	 */
	addLinkedService(newLinkedService) {
		//TODO: Add a check if the service is on the same accessory.
		if (!this.linkedServices.includes(newLinkedService)) {
			this.linkedServices.push(newLinkedService);
		}
		this.emit('service-configurationChange', { service: this });
	}

	/**
	 * Removes a linked {@code Service} from the list
	 * 
	 * @param {Service} oldLinkedService 
	 */
	removeLinkedService(oldLinkedService) {
		//TODO: Add a check if the service is on the same accessory.
		if (this.linkedServices.includes(oldLinkedService)) {
			this.linkedServices.splice(this.linkedServices.indexOf(oldLinkedService), 1);
		}
		this.emit('service-configurationChange', clone({ service: this }));
	}

	/**
	 * Returns a JSON representation of this {@code Service} suitable for 
	 * delivering to HAP clients.
	 * 
	 * @param {{ omitValues: boolean }} options
	 * @returns {Object}
	 */
	toHAP(options) {
		const characteristicsHAP = [];

		this.characteristics.forEach(characteristic => {
			characteristicsHAP.push(characteristic.toHAP(options));
		});

		const hap = {
			iid: this.iid,
			type: this.uuid,
			characteristics: characteristicsHAP,
		};

		if (this.isPrimaryService !== undefined) {
			hap.primary = !!this.isPrimaryService;
		}
		if (this.isHiddenService !== undefined) {
			hap.hidden = !!this.isHiddenService;
		}
		if (this.linkedServices.length > 0) {
			hap.linked = this.linkedServices.map(otherService => otherService.iid);
		}

		return hap;
	}

	/**
	 * Assigns IDD to ourselves and all associated Characteristics. 
	 * Uses the provided identifierCache to keep IDs stable.
	 * 
	 * @param {IdentifierCache} identifierCache
	 * @param {string} accessoryUUID
	 * @param {number} baseIID
	 */
	_assignIDs(identifierCache, accessoryUUID, baseIID) {
		if (baseIID === undefined) {
			baseIID = 0;
		}
		// the Accessory Information service must have a (reserved by IdentifierCache) ID of 1
		if (this.uuid === '0000003E-0000-1000-8000-0026BB765291') {
			this.iid = 1;
		} else {
			// assign our own ID based on our UUID
			const iid = identifierCache.getIID(accessoryUUID, this.uuid, this.subType);
			this.iid = baseIID + iid;
		}

		// assign IIDs to our Characteristics
		this.characteristics.forEach(characteristic => {
			characteristic._assignID(identifierCache, accessoryUUID, this.uuid, this.subType);
		});
	}
}

module.exports = Service;
