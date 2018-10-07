const debug = require('debug')('Characteristic');
const EventEmitter = require('events');

/**
 * Characteristic represents a particular typed variable that can be assigned to a Service. For instance, a
 * "Hue" Characteristic might store a 'float' value of type 'arcdegrees'. You could add the Hue Characteristic
 * to a Service in order to store that value. A particular Characteristic is distinguished from others by its
 * UUID. HomeKit provides a set of known Characteristic UUIDs defined in HomeKitTypes.js along with a
 * corresponding concrete subclass.
 *
 * You can also define custom Characteristics by providing your own UUID. Custom Characteristics can be added
 * to any native or custom Services, but Siri will likely not be able to work with these.
 *
 * Note that you can get the "value" of a Characteristic by accessing the "value" property directly, but this
 * is really a "cached value". If you want to fetch the latest value, which may involve doing some work, then
 * call getValue().
 *
 * @event 'change' => function({ oldValue, newValue, context }) { }
 *        Emitted after a change in our value has occurred. The new value will also be immediately accessible
 *        in this.value. The event object contains the new value as well as the context object originally
 *        passed in by the initiator of this change (if known).
 */
class Characteristic extends EventEmitter {

	/**
	 * @param {string} displayName
	 * @param {string} characteristicUUID
	 * @param {Object} [props]
	 */
	constructor(displayName, characteristicUUID, props) {
		super();
		this.displayName = displayName;
		this.uuid = characteristicUUID;
		this.iid = null; // assigned by our containing Service
		
		this.status = null;
		this.eventOnlyCharacteristic = false;
		this.props = {}; //Object.assign({}, CharacteristicProps.DefaultProps);

		Characteristic.ValidPropKeys
			.filter(prop => props.hasOwnProperty(prop))
			.forEach(prop => this.props[prop] = props[prop]);

		this._finishCharacteristicProps(this.props);

		this.value = this.getDefaultValue();
		this.subscriptions = 0;

		this._onGetCallback = null;
		this._onSetCallback = null;
	}

	/**
	 * Sets callback for obtaining characteristic value.
	 *
	 * @param {Function} callback
	 * @returns {this}
	 * @memberof Characteristic
	 */
	onGet(callback) {
		this._onGetCallback = callback;

		return this;
	}

	/**
	 * Sets callback for setting characteristic value.
	 *
	 * @param {Function} callback
	 * @returns {this}
	 * @memberof Characteristic
	 */
	onSet(callback) {
		this._onSetCallback = callback;

		return this;
	}

	/**
	 * Assigns the given properties to our props member variable,
	 * and returns 'this' for chaining.
	 *
	 * @param {{
	 *   format: <one of Characteristic.Formats>,
	 *   unit: <one of Characteristic.Units>,
	 *   perms: <one of Characteristic.Perms>,
	 *   ev: boolean,
	 *   description: string,
	 *   minValue: number,
	 *   maxValue: number,
	 *   minStep: number
	 *   maxLen: number,
	 *   maxDataLen: number,
	 *   validValues: number[],
	 *   validValuesRange: [number, number]
	 * }} props
	 * @returns {this}
	 */
	setProps(props) {
		CharacteristicProps.ValidPropKeys
			.filter(prop => props.hasOwnProperty(prop))
			.forEach(prop => this.props[prop] = props[prop]);

		this._finishCharacteristicProps(this.props);

		return this;
	}

	/**
	 * Increments the subscription count and emits an event if it's the first
	 * subscription.
	 *
	 * @memberof Characteristic
	 */
	subscribe() {
		if (this.subscriptions === 0) {
			this.emit('subscribe');
		}
		this.subscriptions++;
	}

	/**
	 * Decrements the subscription count and emits an event if no subscribers
	 * are left.
	 *
	 * @memberof Characteristic
	 */
	unsubscribe() {
		const wasOne = this.subscriptions === 1;
		this.subscriptions = Math.max(--this.subscriptions, 0);

		if (wasOne) {
			this.emit('unsubscribe');
		}
	}

	/**
	 * Obtains new value by calling provided callback or returns the cached
	 * value if the callback is not present.
	 *
	 * @param {Object} context
	 * @param {string} connectionID	ID of the HAPConnection through which this
	 * 								request is made.
	 * @returns {any} 				Validated value returned by the callback of
	 * 								the cached value.
	 * @throws {Error} 				if the callback results with error.
	 * @memberof Characteristic
	 */
	async getValue(context, connectionID) {
		// Handle special event only characteristics.
		if (this.eventOnlyCharacteristic === true) {
			return null;
		}
		const { value } = this;

		if (this._onGetCallback) {
			// allow a listener to handle the fetching of this value, and wait for completion.
			try {
				let newValue = this.validateValue(
					await this._onGetCallback(context, connectionID)
				);
				if (newValue === undefined || newValue === null) {
					newValue = this.getDefaultValue();
				}
				if (newValue !== value) {
					this.emit('change', { oldValue: value, newValue, context });
				}

				return (this.value = newValue);

			} catch (error) {
				this.status = error;
				throw error;
			}
		}

		return value;
	}

	/**
	 * Validates and optionally corrects the value if needed. Validation
	 * depends on what format the characteristic uses. Most validation steps 
	 * are done for number formats which need to be checked if they are in a
	 * valid range.
	 *
	 * @param {any} newValue	The incoming value to validate.
	 * @returns {any} 			The validated and corrected value.
	 * @memberof Characteristic
	 */
	validateValue(newValue) {
		switch (this.props.format) {
			case Characteristic.Formats.INT:
			case Characteristic.Formats.FLOAT:
			case Characteristic.Formats.UINT8:
			case Characteristic.Formats.UINT16:
			case Characteristic.Formats.UINT32:
			case Characteristic.Formats.UINT64: {
				if (isNaN(newValue)) {
					newValue = this.value; // This is not a number so we'll just pass out the last value.
				}
				if (typeof newValue === 'boolean') {
					newValue = +newValue; // Convert boolean to integer
				}
				const { minStep, minValue, maxValue } = this.props;

				if (newValue < minValue) {
					newValue = resolvedMinValue; // Fails Minimum Value Test

				} else if (newValue > maxValue) {
					newValue = resolvedMaxValue; // Fails Maximum Value Test

				} else if (minStep !== undefined) { // Value is between min and max, make sure it matches step size
					newValue = newValue - (newValue % minStep);
				}
				break;
			}
			case Characteristic.Formats.BOOL:
				newValue = !!newValue;
				break;
			case Characteristic.Formats.STRING: {
				let string = String(newValue || '');

				if (string.length > this.props.maxLength) {
					string = string.substring(0, this.props.maxLength); //Truncate strings that are too long
				}
				newValue = string; //We don't need to do any validation after having truncated the string
				break;
			}
			case Characteristic.Formats.DATA:
				// If (newValue.length > this.props.maxDataLen) //I don't know the best way to handle this since it's unknown binary data.
				// I suspect that it will crash HomeKit for this bridge if the length is too long.
				return newValue;
			case Characteristic.Formats.TLV8:
				//Should we parse this to make sure the tlv8 is valid?
				return newValue;
		};

		if (
			this.props.validateValues !== undefined &&
			!this.props.validateValues.includes(newValue)
		) {
			return this.value; // Fails Valid Values Test
		}

		if (this.props.validValueRange !== undefined) { //This is another way Apple has to handle min/max
			const [lowRange, highRange] = this.props.validValueRange;

			if (newValue < lowRange) {
				newValue = lowRange;
			}
			if (newValue > highRange) {
				newValue = highRange;
			}
		}

		return newValue;
	}

	/**
	 * Caches a new value locally and calls a provided callback that should
	 * interact with the accessory HW.
	 *
	 * @param {any} newValue 		The value to be set and cached.
	 * @param {Object} context
	 * @param {string} connectionID	ID of the HAPConnection through which this
	 * 								request is made.
	 * @returns {this}
	 * @throws {Error} 				if the callback results with error.
	 * @memberof Characteristic
	 */
	async setValue(newValue, context, connectionID) {
		this.status = newValue instanceof Error ? newValue : null;
		newValue = this.validateValue(newValue);

		if (newValue === undefined || newValue === null) {
			newValue = this.getDefaultValue();
		}
		try {
			if (this._onSetCallback) {
				await this._onSetCallback(newValue, context, connectionID);
			}
	
			// setting the value was a success; so we can cache it now
			const oldValue = this.value;
			this.value = newValue;

			if (this.eventOnlyCharacteristic === true || oldValue !== newValue) {
				this.emit('change', { oldValue, newValue, context });
			}
		} catch (error) {
			// possible, do something with the error...
			throw error;
		}

		return this; // for chaining
	}

	/**
	 * Updates the cached value without calling the set callback.
	 *
	 * @param {any} newValue 		The value to be set and cached.
	 * @param {Object} context
	 * @returns {this}
	 * @memberof Characteristic
	 */
	async updateValue(newValue, context) {

		// temporary remove the callback (the easiest way without code duplicities)
		const tempCallback = this._onSetCallback;
		this._onSetCallback = null;

		await this.setValue(newValue, context);

		// return callback back to normal
		this._onSetCallback = tempCallback;

		return this;
	}

	/**
	 * Returns default value depending on what format the characteristic uses
	 *
	 * @returns {any}
	 * @memberof Characteristic
	 */
	getDefaultValue() {

		switch (this.props.format) {
			case Characteristic.Formats.BOOL:
				return false;
			case Characteristic.Formats.STRING:
				return "";
			case Characteristic.Formats.DATA:
			case Characteristic.Formats.TLV8:
				return null; // who knows!
			case Characteristic.Formats.DICTIONARY:
				return {};
			case Characteristic.Formats.ARRAY:
				return [];
			default: 
				return this.minValue || 0;
		}
	}

	/**
	 * Returns a JSON representation of this Accessory suitable for delivering to HAP clients.
	 * 
	 * @param {{ omitValues: boolean }} options
	 * @returns {{
	 * 		iid: number,
	 * 		type: string,
	 * 		perms: string[],
	 * 		format: string,
	 * 		value: any,
	 * 		description: string|null
	 * }}
	 */
	toHAP(options) {
		let value = this.value;

		if (this.eventOnlyCharacteristic === true) {
			value = null;
		}

		const hap = {
			iid: this.iid,
			type: this.uuid,
			perms: this.props.perms,
			format: this.props.format,
			value,
			description: this.displayName

			// These properties used to be sent but do not seem to be used:
			//
			// events: false,
			// bonjour: false
		};

		if (
			this.props.validValues != null &&
			this.props.validValues.length > 0
		) {
			hap['valid-values'] = this.props.validValues;
		}

		if (
			this.props.validValueRange != null &&
			this.props.validValueRange.length === 2
		) {
			hap['valid-values-range'] = this.props.validValueRange;
		}

		// extra properties
		if (this.props.unit !== null) {
			hap.unit = this.props.unit;
		}
		if (this.props.maxValue !== null) {
			hap.maxValue = this.props.maxValue;
		}
		if (this.props.minValue !== null) {
			hap.minValue = this.props.minValue;
		}
		if (this.props.minStep !== null) {
			hap.minStep = this.props.minStep;
		}

		// add maxLen if string length is > 64 bytes and trim to max 256 bytes
		if (this.props.format === Characteristic.Formats.STRING) {
			const str = Buffer.from(value, 'utf8');
			const len = str.byteLength;

			if (len > 256) { // 256 bytes is the max allowed length
				hap.value = str.toString('utf8', 0, 256);
				hap.maxLen = 256;
			} else if (len > 64) { // values below can be ommited
				hap.maxLen = len;
			}
		}

		// if we're not readable, omit the "value" property - otherwise iOS will complain about non-compliance
		if (!this.props.perms.includes(Characteristic.Perms.PAIRED_READ)) {
			delete hap.value;
		}

		// delete the "value" property anyway if we were asked to
		if (options && options.omitValues) {
			delete hap.value;
		}

		return hap;
	}

	/**
	 * Assigns IID to ourselves. Uses the provided identifierCache to keep 
	 * IDs stable.
	 *
	 * @param {IdentifierCache} identifierCache
	 * @param {string} accessoryUUID
	 * @param {string} serviceUUID
	 * @param {string} serviceSubtype
	 * @memberof Characteristic
	 */
	_assignID(identifierCache, accessoryUUID, serviceUUID, serviceSubtype) {

		// generate our IID based on our UUID
		this.iid = identifierCache.getIID(accessoryUUID, serviceUUID, serviceSubtype, this.uuid);
	}

	_finishCharacteristicProps(props) {

		if (!props.format || !Object.values(Characteristic.Formats).includes(props.format)) {
			throw new Error(`Invalid characteristic format '${props.format}' was given.`);
		}

		if (this._isNumericFormat()) {
			if (isNaN(props.minStep) || props.minStep === null) {
				props.minStep = Characteristic.NumericLimits[props.format].minStep;
			}

			if (isNaN(props.minValue) || props.minValue === null) {
				return Characteristic.NumericLimits[props.format].minValue;
			}

			if (isNaN(props.maxValue) || props.maxValue === null) {
				return Characteristic.NumericLimits[props.format].maxValue;
			}

			if (props.maxLength === undefined) {
				props.maxLength = 64;
			}

			if (props.maxDataLength === undefined) {
				props.maxDataLength = 2097152;
			}
		}
	}

	/**
	 * Returns {@code true} if this characteristic takes value of numeric
	 * format.
	 *
	 * @returns {boolean}
	 */
	_isNumericFormat() {
		return [
			Characteristic.Formats.INT,
			Characteristic.Formats.FLOAT,
			Characteristic.Formats.UINT8,
			Characteristic.Formats.UINT16,
			Characteristic.Formats.UINT32,
			Characteristic.Formats.UINT64
		].includes(this.format);
	}
}

// Known HomeKit formats
Characteristic.Formats = {
	BOOL: 'bool',
	INT: 'int',
	FLOAT: 'float',
	STRING: 'string',
	UINT8: 'uint8',
	UINT16: 'uint16',
	UINT32: 'uint32',
	UINT64: 'uint64',
	DATA: 'data',
	TLV8: 'tlv8',
	ARRAY: 'array', //Not in HAP Spec
	DICTIONARY: 'dict' //Not in HAP Spec
}


// Known HomeKit unit types
Characteristic.Units = {
	// HomeKit only defines Celsius, for Fahrenheit, it requires iOS app to do the conversion.
	CELSIUS: 'celsius',
	PERCENTAGE: 'percentage',
	ARC_DEGREE: 'arcdegrees',
	LUX: 'lux',
	SECONDS: 'seconds'
}

// Known HomeKit permission types
Characteristic.Perms = {
	PAIRED_READ: 'pr', //Added to match HAP's terminology
	PAIRED_WRITE: 'pw', //Added to match HAP's terminology
	EVENTS: 'ev', //Added to match HAP's terminology
	ADDITIONAL_AUTHORIZATION: 'aa',
	TIMED_WRITE: 'tw', //Not currently supported by IP
	HIDDEN: 'hd'
}

Characteristic.DefaultProps = {
	format: null,
	unit: null,
	minValue: null,
	maxValue: null,
	minStep: null,
	perms: []
};

Characteristic.ValidPropKeys = [
	'format', 'unit', 'perms', 'ev', 'description', 'minValue', 'maxValue',
	'minStep', 'maxLen', 'maxDataLen', 'validValues', 'validValuesRange'
];

Characteristic.NumericLimits = {
	[Characteristic.Formats.INT]: {
		minStep: 1,
		minValue: -2147483648,
		maxValue: 2147483647
	},
	[Characteristic.Formats.FLOAT]: {
		minStep: undefined,
		minValue: undefined,
		maxValue: undefined
	},
	[Characteristic.Formats.UINT8]: {
		minStep: 1,
		minValue: 0,
		maxValue: 255
	},
	[Characteristic.Formats.UINT16]: {
		minStep: 1,
		minValue: 0,
		maxValue: 65535
	},
	[Characteristic.Formats.UINT32]: {
		minStep: 1,
		minValue: 0,
		maxValue: 4294967295
	},
	[Characteristic.Formats.UINT64]: {
		minStep: 1,
		minValue: 0,
		maxValue: 18446744073709551615
	}
};

module.exports = Characteristic;
