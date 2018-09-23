const bonjour = require('bonjour-hap');
const debug = require('debug')('Advertiser');
const crypto = require('crypto');

/**
 * Advertiser uses mdns to broadcast the presence of an Accessory to the local network.
 *
 * Note that as of iOS 9, an accessory can only pair with a single client. Instead of pairing your
 * accessories with multiple iOS devices in your home, Apple intends for you to use Home Sharing.
 * To support this requirement, we provide the ability to be "discoverable" or not (via a "service flag" on the
 * mdns payload).
 */
class Advertiser {

	/**
	 * Creates an instance of Advertiser.
	 * 
	 * @param {Object} accessoryInfo
	 * @param {AccessoryCache} accessoryCache
	 * @memberof Advertiser
	 */
	constructor(accessoryInfo, accessoryCache) {
		this.accessoryInfo = accessoryInfo;
		this.accessoryCache = accessoryCache;
		this._bonjourService = bonjour();
		this._advertisement = null;

		this._setupHash = this._computeSetupHash();
	}

	startAdvertising(port) {
		// stop advertising if necessary
		if (this._advertisement) {
			this.stopAdvertising();
		}

		const { displayName, username, category } = this.accessoryInfo;
		const { configVersion } = this.accessoryCache;

		debug(`[${displayName}] Starting advertising over bonjour.`);

		const txtRecord = {
			md: displayName,
			pv: "1.0",
			id: username,
			"c#": configVersion + "", // "accessory conf" - represents the "configuration version" of an Accessory. Increasing this "version number" signals iOS devices to re-fetch /accessories data.
			"s#": "1", // "accessory state"
			"ff": "0",
			"ci": category,
			"sf": this.accessoryCache.isPaired() ? "0" : "1", // "sf == 1" means "discoverable by HomeKit iOS clients"
			"sh": this._setupHash
		};

		/**
		 * The host name of the component is probably better to be
		 * the username of the hosted accessory + '.local'.
		 * By default 'bonjour' doesnt add '.local' at the end of the os.hostname
		 * this causes to return 'raspberrypi' on raspberry pi / raspbian
		 * then when the phone queryies for A/AAAA record it is being queried
		 * on normal dns, not on mdns. By Adding the username of the accessory
		 * probably the problem will also fix a possible problem 
		 * of having multiple pi's on same network
		 */
		const host = username.replace(/\:/ig, "_") + '.local';
		const advertiseName = displayName
			+ "-"
			+ crypto.createHash('sha512').update(username, 'utf8').digest('hex').slice(0, 4).toUpperCase();

		// create/recreate our advertisement
		this._advertisement = this._bonjourService.publish({
			name: advertiseName,
			type: "hap",
			port: port,
			txt: txtRecord,
			host: host
		});
	}

	isAdvertising() {
		return (this._advertisement != null);
	}

	updateAdvertisement() {
		if (this._advertisement) {
			const { displayName, username, category } = this.accessoryInfo;
			const {  configVersion } = this.accessoryCache;

			const txtRecord = {
				md: displayName,
				pv: "1.0",
				id: username,
				"c#": configVersion + "", // "accessory conf" - represents the "configuration version" of an Accessory. Increasing this "version number" signals iOS devices to re-fetch /accessories data.
				"s#": "1", // "accessory state"
				"ff": "0",
				"ci": category,
				"sf": this.accessoryCache.isPaired() ? "0" : "1", // "sf == 1" means "discoverable by HomeKit iOS clients"
				"sh": this._setupHash
			};

			this._advertisement.updateTxt(txtRecord);

			debug(`[${displayName}] Advertising updated.`);
		}
	}

	stopAdvertising() {
		const { displayName } = this.accessoryInfo;
		debug(`[${displayName}] Stopping advertising over bonjour.`);

		if (this._advertisement) {
			this._advertisement.stop();
			this._advertisement = null;
		}

		this._bonjourService.unpublishAll(() => {
			debug(`[${displayName}] Destroying bonjour service.`);
			this._bonjourService.destroy();
		});
	}

	_computeSetupHash() {
		const { username } = this.accessoryInfo;
		const { setupID } = this.accessoryCache;

		const hash = crypto.createHash('sha512');
		hash.update(setupID + username);

		return hash.digest().slice(0, 4).toString('base64');
	}
}

module.exports = Advertiser;