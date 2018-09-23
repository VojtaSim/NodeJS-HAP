const tlv = require('../encryption/tlv');

/**
 * Wrapper for manipulating with request data.
 */
class HAPRequestData {

	/**
	 * Creates an instance of HAPRequestData.
	 *
	 * @param {Buffer} data
	 * @memberof HAPRequestData
	 */
	constructor(data) {
		this._data = data || Buffer.alloc(0);
		this._decoded = null;
	}

	get sequenceNumber() {
		return this._data[HAPRequestData.Types.SEQUENCE_NUM][0];
	}

	get requestType() {
		return this._data[HAPRequestData.Types.REQUEST_TYPE][0];
	}

	/**
	 * Public key that exists only for a single login session.
	 */
	get publicKey() {
		return this._data[HAPRequestData.Types.PUBLIC_KEY];
	}

	/**
	 * The proof that you actually know your own password.
	 */
	get passwordProof() {
		return this._data[HAPRequestData.Types.PASSWORD_PROOF];
	}

	get username() {
		return this._data[HAPRequestData.Types.USERNAME];
	}

	/**
	 * The proof that you actually know your own password.
	 */
	get encryptedData() {
		return this._data[HAPRequestData.Types.ENCRYPTED_DATA];
	}

	decode() {
		return new HAPRequestData(tlv.decode(this._data));
	}

	toString() {
		return this._data.toString();
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