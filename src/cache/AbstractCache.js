const fs = require('fs');
const path = require('path');
const Cache = require('./Cache');

class AbstractCache extends Cache {

	/**
	 * Returns path for storing cache files.
	 *
	 * @returns {string}
	 */
	static get storagePath() {
		return Cache._storagePath;
	}

	/**
	 * Sets path for storing cache files.
	 * 
	 * @param {string} path
	 * @throws {Error} if the given path is invalid
	 */
	static set storagePath(path) {
		if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
			throw new Error(`Provided storage path '${path}' is not valid directory.`);
		}

		Cache._storagePath = path;
	}

	/**
	 * Reads the cache file and returns its content.
	 *
	 * @param {string} fileName
	 * @returns {Object}
	 */
	static readCacheFile(fileName) {
		const filePath = AbstractCache._getFilePath(fileName);

		if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
			throw new Error(`Unable to load file '${filePath}'.`);
		}

		return JSON.parse(fs.readFileSync(filePath, 'utf8'));
	}

	/**
	 * Writes data to the cache file.
	 *
	 * @param {string} fileName 
	 * @param {Object} data 
	 */
	static writeCacheFile(fileName, data) {
		const filePath = AbstractCache._getFilePath(fileName);

		fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
	}

	/**
	 * Removes cache file from filesystem.
	 *
	 * @param {string} fileName
	 */
	static deleteCacheFile(fileName) {
		const filePath = AbstractCache._getFilePath(fileName);

		if (fs.existsSync(filePath) && fs.statSync(path).isFile()) {
			fs.unlinkSync(filePath);
		}
	}

	/**
	 * Construct full path to the file.
	 *
	 * @param {string} fileName
	 * @returns {string}
	 */
	static _getFilePath (fileName) {
		return AbstractCache._storagePath + path.sep + fileName + '.json';
	}
}

AbstractCache._storagePath = path.resolve(__dirname, '../../persist');

module.exports = AbstractCache;