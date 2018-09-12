const crypto = require('crypto');
const AbstractCache = require('./AbstractCache');

/**
 * IdentifierCache is a class that manages a system of associating HAP
 * "Accessory IDs" and "Instance IDs" with other values that don't usually
 * change. HomeKit Clients use Accessory/Instance IDs as a primary key of
 * sorts, so the IDs need to remain "stable". For instance, if you create
 * a HomeKit "Scene" called "Leaving Home" that sets your Alarm System's 
 * "Target Alarm State" Characteristic to "Arm Away", that Scene will store 
 * whatever "Instance ID" it was given for the "Target Alarm State"
 * Characteristic. If the ID changes later on this server, the scene will stop
 * working.
 * 
 * @extends AbstractCache
 */
class IdentifierCache extends AbstractCache {

	/**
	 * Loads the identifiers from the cache and return a new instance of 
	 * IdentifierCache.
	 *
	 * @param {string} uuid The UUID string identifying the accessory.
	 * @returns {IdentifierCache|null}
	 */
	static load(uuid) {
		try {
			const savedCache = IdentifierCache.readCacheFile(
				IdentifierCache.getCacheFilename(uuid)
			);

			const identifiers = new IdentifierCache(uuid);
			identifiers._cache = savedCache;
			//calculate hash of the saved hash to decide in future if saving of new cache is neeeded
			identifiers._hash = crypto.createHash('sha1').update(JSON.stringify(identifiers._cache)).digest('hex');

			return info;

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
		return uuid + '.Identifiers';
	}

	/**
	 * Creates an instance of IdentifierCache.
	 *
	 * @param {string} uuid The UUID string identifying the accessory.
	 * @memberof IdentifierCache
	 */
	constructor(uuid) {
		super();
		this.uuid = uuid;
		this._cache = {}; // cache[key:string] = id:number
		this._usedCache = null; // for usage tracking and expiring old keys
		this._hash = ""; // for checking if new cache neeed to be saved

		this._lastAID = null;
		this._lastIID = {};
	}

	/**
	 * Marks the beginning of tracking cache usage. Clears the used cache
	 * object that is used to do the tracking.
	 */
	startTrackingUsage() {
		this._usedCache = {};
	}

	/**
	 * Simply rotates in the new cache that was built during tracking.
	 */
	stopTrackingUsageAndExpireUnused() {
		this._cache = this._usedCache;
		this._usedCache = null;
	}

	/**
	 * Returns the cached value and marks the accessed key as used if we're
	 * tracking cache usage.
	 *
	 * @param {string} key
	 * @returns {number}
	 */
	getCache(key) {
		const value = this._cache[key];

		// track this cache item if needed
		if (this._usedCache && typeof value !== 'undefined') {
			this._usedCache[key] = value;
		}

		return value;
	}

	/**
	 * Sets the cache value and updates the value in used cache tracking object
	 * if we're tracking cache usage.
	 *
	 * @param {string} key
	 * @param {number} value
	 * @returns {number}
	 */
	setCache(key, value) {
		this._cache[key] = value;

		// track this cache item if needed
		if (this._usedCache) {
			this._usedCache[key] = value;
		}

		return value;
	}

	/**
	 * Retrieves the accessory ID from the cache or generates a new one.
	 * 
	 * @param {string} accessoryUUID 
	 * @returns {number}
	 */
	getAID(accessoryUUID) {
		return this.getCache(accessoryUUID) || this.setCache(accessoryUUID, this.getNextAID());
	}

	/**
	 * Retrieves the instance ID from the cache or generates a new one.
	 * The instance can be either service or a characteristic.
	 *
	 * @param {string} accessoryUUID 
	 * @param {string} serviceUUID 
	 * @param {string} [serviceSubtype]
	 * @param {string} [characteristicUUID]
	 * @returns {number}
	 */
	getIID(accessoryUUID, serviceUUID, serviceSubtype, characteristicUUID) {

		const instanceIdentifiers = [accessoryUUID, serviceUUID, serviceSubtype, characteristicUUID]
			.filter(identifier => identifier)
			.join('|');

		return this.getCache(instanceIdentifiers) || this.setCache(instanceIdentifiers, this.getNextIID(accessoryUUID));
	}

	/**
	 * Returns incremented highest accessory ID there is. The returned value
	 * needs to be stored in the cache. 
	 *
	 * @returns {number}
	 */
	getNextAID() {
		if (this._lastAID) {
			return ++this._lastAID;
		}
		const IDs = Object.keys(this._cache)
			.filter(identifier => !identifier.includes('|'))
			.map(identifier => this._cache[identifier]);

		return (this._lastAID = Math.max(...IDs) + 1);
	}

	/**
	 * Returns incremented highest instance ID among other IIDs in the accessory.
	 *
	 * @param {string} accessoryUUID
	 * @returns {number}
	 */
	getNextIID(accessoryUUID) {
		if (this._lastIID && this._lastIID[accessoryUUID]) {
			return ++this._lastAID[accessoryUUID];
		}
		const IDs = Object.keys(this._cache)
			.filter(identifier => identifier.includes(accessoryUUID + '|'))
			.map(identifier => this._cache[identifier]);

		return (this._lastIID[accessoryUUID] = Math.max(...IDs) + 1);
	}

	/**
	 * Saves the cache if it's actually changed.
	 *
	 * @memberof IdentifierCache
	 */
	save() {
		const newCacheHash = crypto.createHash('sha1').update(JSON.stringify(this._cache)).digest('hex'); //calculate hash of new cache
		if (newCacheHash === this._hash) {
			return;
		}
		IdentifierCache.writeCacheFile(
			IdentifierCache.getCacheFilename(this.uuid),
			this._cache
		);
		this._hash = newCacheHash;
	}

	/**
	 * Removes the cache file.
	 *
	 * @memberof IdentifierCache
	 */
	remove() {
		IdentifierCache.deleteCacheFile(IdentifierCache.getCacheFilename(this.uuid));
	}
}

module.exports = IdentifierCache;