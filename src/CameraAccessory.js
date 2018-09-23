const Accessory = require('./Accessory');

class CameraAccessory extends Accessory {

	constructor(cameraUUID, cameraInfo, cameraConfig) {
		super(cameraUUID, cameraInfo);

		const { videoConfig, name } = cameraConfig;
		const options = {
			source, stillImageSource, vcodec, acodec, audio, 
			packetSize, maxFps = 10, maxBitrate = 300, maxStreams = 2
		} = videoConfig;

		if (!source) {
			throw new Error("Missing source for camera.");
		}

		this.name = name;

		this.services = [];
		this.streamControllers = [];

		this.pendingSessions = {};
		this.ongoingSessions = {};

		var numberOfStreams = ffmpegOpt.maxStreams || 2;
		var videoResolutions = [];

		this.maxWidth = ffmpegOpt.maxWidth || 1280;
		this.maxHeight = ffmpegOpt.maxHeight || 720;
		var maxFPS = (this.fps > 30) ? 30 : this.fps;

		if (this.maxWidth >= 320) {
			if (this.maxHeight >= 240) {
				videoResolutions.push([320, 240, maxFPS]);
				if (maxFPS > 15) {
					videoResolutions.push([320, 240, 15]);
				}
			}

			if (this.maxHeight >= 180) {
				videoResolutions.push([320, 180, maxFPS]);
				if (maxFPS > 15) {
					videoResolutions.push([320, 180, 15]);
				}
			}
		}

		if (this.maxWidth >= 480) {
			if (this.maxHeight >= 360) {
				videoResolutions.push([480, 360, maxFPS]);
			}

			if (this.maxHeight >= 270) {
				videoResolutions.push([480, 270, maxFPS]);
			}
		}

		if (this.maxWidth >= 640) {
			if (this.maxHeight >= 480) {
				videoResolutions.push([640, 480, maxFPS]);
			}

			if (this.maxHeight >= 360) {
				videoResolutions.push([640, 360, maxFPS]);
			}
		}

		if (this.maxWidth >= 1280) {
			if (this.maxHeight >= 960) {
				videoResolutions.push([1280, 960, maxFPS]);
			}

			if (this.maxHeight >= 720) {
				videoResolutions.push([1280, 720, maxFPS]);
			}
		}

		if (this.maxWidth >= 1920) {
			if (this.maxHeight >= 1080) {
				videoResolutions.push([1920, 1080, maxFPS]);
			}
		}

		let options = {
			proxy: false, // Requires RTP/RTCP MUX Proxy
			srtp: true, // Supports SRTP AES_CM_128_HMAC_SHA1_80 encryption
			video: {
				resolutions: videoResolutions,
				codec: {
					profiles: [0, 1, 2], // Enum, please refer StreamController.VideoCodecParamProfileIDTypes
					levels: [0, 1, 2] // Enum, please refer StreamController.VideoCodecParamLevelTypes
				}
			},
			audio: {
				codecs: [
					{
						type: "OPUS", // Audio Codec
						samplerate: 24 // 8, 16, 24 KHz
					},
					{
						type: "AAC-eld",
						samplerate: 16
					}
				]
			}
		}

		this.createCameraControlService();
		this._createStreamControllers(numberOfStreams, options);
	}

	configureCameraSource(cameraSource) {
		this.cameraSource = cameraSource;

		cameraSource.services.forEach(service => this.addService(service));
	}

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

	_handleSessionClose(sessionID, events) {
		if (this.cameraSource && this.cameraSource.handleCloseConnection) {
			this.cameraSource.handleCloseConnection(sessionID);
		}

		super._handleSessionClose(events);
	}
}

module.exports = CameraAccessory;
