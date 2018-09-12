'use strict';

const Accessory = require('./Accessory');

module.exports = Accessory;

class CameraAccessory extends Accessory {

	constructor(displayName, UUID) {
		super(displayName, UUID);

		this.cameraSource = null;
	}

	//
	// Event handlers
	// ------------------------------------------------------------------------

	async handleResourceRequest(data) {
		if (data['resource-type'] == 'image') {
			if (this.cameraSource) {
				return await this.cameraSource.handleSnapshotRequest({
					width: data["image-width"],
					height: data["image-height"]
				});
			}
		}
	}

	// 
	// Public methods
	// ------------------------------------------------------------------------

	configureCameraSource(cameraSource) {
		this.cameraSource = cameraSource;

		cameraSource.services.forEach(service => this.addService(service));
	}

	_handleSessionClose(sessionID, events) {
		if (this.cameraSource && this.cameraSource.handleCloseConnection) {
			this.cameraSource.handleCloseConnection(sessionID);
		}

		super._handleSessionClose(events);
	}
}
