
class Cache {
	/**
	 * Reads the cache file and returns its content.
	 *
	 * @param {string} fileName
	 * @returns {Object}
	 */
	static readCacheFile() {}

	/**
	 * Writes data to the cache file.
	 *
	 * @param {string} fileName 
	 * @param {Object} data 
	 */
	static writeCacheFile() {}

	/**
	 * Removes cache file from filesystem.
	 *
	 * @param {string} fileName
	 */
	static deleteCacheFile() {}
}

module.exports = Cache;