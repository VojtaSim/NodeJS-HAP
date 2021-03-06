const crypto = require('crypto');
const ed25519 = require('ed25519-hap');
const AbstractCache = require('./AbstractCache');

function generateSetupID() {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const bytes = crypto.randomBytes(4);
	let setupID = '';

	for (var i = 0; i < 4; i++) {
		const index = bytes.readUInt8(i) % 26;
		setupID += chars.charAt(index);
	}

	return setupID;
}

/**
 * AccessoryInfo is a model class containing a subset of Accessory data relevant to the internal HAP server,
 * such as encryption keys and username. It is persisted to disk.
 */
class AccessoryCache extends AbstractCache {

	static create(uuid) {
		const accessoryCache = new AccessoryCache(uuid);
		const { privateKey, publicKey } = ed25519.MakeKeypair(crypto.randomBytes(32));

		accessoryCache.privateKey = privateKey;
		accessoryCache.publicKey = publicKey;
		accessoryCache.setupID = generateSetupID();

		return accessoryCache;
	}

	static load(uuid) {
		try {
			const saved = AccessoryCache.readCacheFile(AccessoryCache.getCacheFilename(uuid));
			const cache = new AccessoryCache(uuid);

			let {
				privateKey = '', publicKey = '', pairedClients = {}, setupID,
				configVersion = 1, configHash,
			} = saved;

			privateKey = Buffer.from(privateKey, 'hex');
			publicKey = Buffer.from(publicKey, 'hex');

			for (const username in pairedClients) {
				pairedClients[username] = Buffer.from(
					pairedClients[username],
					'hex'
				);
			}

			Object.assign(cache, {
				privateKey, publicKey, pairedClients, setupID,
				configVersion, configHash
			});

			return cache;

		} catch (error) {
			return null;
		}
	}

	/**
	 * Return cache filename for a specific accessory.
	 *
	 * @param {string} uuid The UUID string identifying the accessory.
	 * @returns {string}
	 */
	static getCacheFilename(uuid) {
		return uuid + '.Accessory';
	}

	/**
	 * Creates an instance of AccessoryCache.
	 * 
	 * @param {string} uuid The UUID string identifying the accessory.
	 * @memberof AccessoryCache
	 */
	constructor(uuid) {
		super();
		this.uuid = uuid;
		this.privateKey = Buffer.alloc(0);
		this.publicKey = Buffer.alloc(0);
		this.pairedClients = {};
		this.configVersion = 1;
		this.configHash = '';

		this.setupID = '';
	}

	/**
	 * Add a paired client to memory.
	 * 
	 * @param {string} username 
	 * @param {Buffer} publicKey 
	 */
	addPairedClient(username, publicKey) {
		if (!publicKey instanceof Buffer) {
			publicKey = Buffer.from(publicKey, 'hex');
		}
		this.pairedClients[username] = publicKey;
	}

	/**
	 * Remove a paired client from memory.
	 *
	 * @param {string} username 
	 */
	removePairedClient(username) {
		delete this.pairedClients[username];
	}

	/**
	 * Gets the public key for a paired client as a Buffer, or undefined if not
	 * paired.
	 * 
	 * @param {string} username
	 * @returns {Buffer|undefined}
	 */
	getClientPublicKey(username) {
		return this.pairedClients[username];
	}

	/**
	 * Returns a boolean indicating whether this accessory has been paired
	 * with any client.
	 * 
	 * @returns {boolean}
	 */
	isPaired() {
		return Object.keys(this.pairedClients).length > 0;
	}

	/**
	 * Saves the cache
	 *
	 * @memberof AccessoryCache
	 */
	save() {
		const {
			setupID, configVersion, configHash, privateKey, publicKey
		} = this;

		const values = {
			pairedClients: {}, setupID, configVersion, configHash
		};

		values.privateKey = privateKey.toString('hex');
		values.publicKey = publicKey.toString('hex');

		for (const username in this.pairedClients) {
			values.pairedClients[username] = this.pairedClients[username].toString('hex');
		}

		AccessoryCache.writeCacheFile(this.uuid + '.Accessory', values);
	}

	/**
	 * Removes the cache file.
	 *
	 * @memberof AccessoryCache
	 */
	remove() {
		AccessoryCache.deleteCacheFile(this.uuid + '.Accessory');
	}
}

module.exports = AccessoryCache;