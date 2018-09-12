const tlv = require('../encryption/tlv');

/**
 * Wrapper for manipulating with request data. After the request finished
 * transmitting the received data are decoded using TLV.
 */
class HAPRequestData {

	/**
	 * @param {http.IncomingMessage} request
	 */
	constructor(request) {
		this._buffer = Buffer.alloc(0);
		this._data = null;

		request.on('data', data => {
			this._buffer = Buffer.concat([this._buffer, data]);
		});

		request.on('end', () => {
			this._data = tlv.decode(this._buffer);
		});
	}

	get sequenceNumber() {
		this._checkDataPresence();
		return this._data[HAPRequestData.Types.SEQUENCE_NUM][0];
	}

	get requestType() {
		this._checkDataPresence();
		return this._data[HAPRequestData.Types.REQUEST_TYPE][0];
	}

	/**
	 * Public key that exists only for a single login session.
	 */
	get publicKey() {
		this._checkDataPresence();
		return this._data[HAPRequestData.Types.PUBLIC_KEY];
	}

	/**
	 * The proof that you actually know your own password.
	 */
	get passwordProof() {
		this._checkDataPresence();
		return this._data[HAPRequestData.Types.PASSWORD_PROOF];
	}

	get username() {
		this._checkDataPresence();
		return this._data[HAPRequestData.Types.USERNAME];
	}

	/**
	 * The proof that you actually know your own password.
	 */
	get encryptedData() {
		this._checkDataPresence();
		return this._data[HAPRequestData.Types.ENCRYPTED_DATA];
	}

	/**
	 * Checks if the request data finished transmitting.
	 *
	 * @throws {Error}
	 */
	_checkDataPresence() {
		if (!this._data) {
			throw new Error('Accessing request data before the request finished transmitting.');
		}
	}
}

// Various "type" constants for HAP's TLV encoding.
HAPRequestData.Types = {
	REQUEST_TYPE: 0x00,
	USERNAME: 0x01,
	SALT: 0x02,
	PUBLIC_KEY: 0x03,
	PASSWORD_PROOF: 0x04,
	ENCRYPTED_DATA: 0x05,
	SEQUENCE_NUM: 0x06,
	ERROR_CODE: 0x07,
	PROOF: 0x0a
};

module.exports = HAPRequestData;