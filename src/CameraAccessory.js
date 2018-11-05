const debug = require('debug')('CameraAccessory');
const Accessory = require('./Accessory');
const StreamController = require('./camera/StreamController');
const { spawn, spawnSync } = require('child_process');
const crypto = require('crypto');
const ip = require('ip');
const fs = require('fs');

const CAMERA_ENABLED_CATEGORIES = [
	Accessory.Categories.CAMERA,
	Accessory.Categories.VIDEO_DOORBELL
];

class CameraAccessory extends Accessory {

	constructor(cameraUUID, cameraInfo, cameraConfig) {
		if (!cameraInfo.category || !CAMERA_ENABLED_CATEGORIES.includes[cameraInfo.category]) {
			cameraInfo.category = Accessory.Categories.CAMERA
		}
		super(cameraUUID, cameraInfo);

		const {
			source, stillImageSource, vCodec = 'libx264', aCodec = 'libfdk_aac',
			audioEnabled, packetSize = 1316, maxFps = 10, maxBitrate = 300,
			streams = 2, maxWidth = 1280, maxHeight = 720
		} = cameraConfig;

		if (!source) {
			throw new Error("Missing source for camera.");
		}

		this.streamControllers = [];
		this.config = {
			source, stillImageSource, vCodec, aCodec, audioEnabled, packetSize,
			maxFps, maxBitrate, streams, maxWidth, maxHeight
		};

		this.pendingSessions = {};
		this.ongoingSessions = {};

		const videoResolutions = [];
		const fps = Math.min(30, maxFps);

		if (maxWidth >= 320) {
			if (maxHeight >= 240) {	// 4:3
				videoResolutions.push([320, 240, fps]);
				if (fps > 15) {
					// required for Apple Watch
					videoResolutions.push([320, 240, 15]);
				}
			}

			if (maxHeight >= 180) { // 16:9
				videoResolutions.push([320, 180, fps]);
				if (fps > 15) {
					// required for Apple Watch
					videoResolutions.push([320, 180, 15]);
				}
			}
		}

		if (maxWidth >= 480) {
			if (maxHeight >= 360) {	// 4:3
				videoResolutions.push([480, 360, fps]);
			}

			if (maxHeight >= 270) { // 16:9
				videoResolutions.push([480, 270, fps]);
			}
		}

		if (maxWidth >= 640) {
			if (maxHeight >= 480) { // 4:3
				videoResolutions.push([640, 480, fps]);
			}

			if (maxHeight >= 360) { // 16:9
				videoResolutions.push([640, 360, fps]);
			}
		}

		if (maxWidth >= 1280) {
			if (maxHeight >= 960) { // 4:3
				videoResolutions.push([1280, 960, fps]);
			}

			if (maxHeight >= 720) { // 16:9
				videoResolutions.push([1280, 720, fps]);
			}
		}

		if (maxWidth >= 1920) {
			if (maxHeight >= 1440) { // 4:3
				videoResolutions.push([1920, 1440, fps]);
			}

			if (maxHeight >= 1080) {  // 16:9
				videoResolutions.push([1920, 1080, fps]);
			}
		}

		const streamOptions = {
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
						sampleRate: 24 // 8, 16, 24 KHz
					},
					{
						type: "AAC-eld",
						sampleRate: 16
					}
				]
			}
		}

		this.createCameraControlServices(streams, streamOptions);
	}

	/**
	 * Constructs stream controllers to accommodate desired number of streams
	 * and a Microphone service if the audio is enabled.
	 *
	 * @param {number} numberOfStreams
	 * @param {Object} streamOptions
	 */
	createCameraControlServices(numberOfStreams, streamOptions) {
		for (let index = 0; index < numberOfStreams; index++) {
			const streamController = this.createStreamController(
				index,
				streamOptions
			);

			this.addService(streamController.streamManagementService);
			this.streamControllers.push(streamController);
		}

		if (this.config.audioEnabled) {
			this.addService(Service.Microphone);
		}
	}

	/**
	 * Constructs single instance of StreamController. This method can be
	 * overridden to provide custom implementation of StreamController.
	 * 
	 * @param {number} identifier
	 * @param {Object} options
	 * @returns {StreamController}
	 */
	createStreamController(identifier, options) {
		return new StreamController(
			identifier,
			options,
			this
		);
	}

	/**
	 * Returns image buffer for requested image resource
	 *
	 * @param {{ image-width: number, image-height: number }} data
	 * @returns {Buffer}
	 */
	async handleResourceRequest(data) {
		if (data['resource-type'] == 'image') {
			return await this.handleSnapshotRequest({
				width: data["image-width"],
				height: data["image-height"]
			});
		}
	}

	/**
	 * Returns {@code Buffer} containing image data from the remote source.
	 *
	 * @param {{ width: number, height: number }} request
	 * @returns {Promise<Buffer>}
	 */
	handleSnapshotRequest(request) {
		const resolution = request.width + ':' + request.height;
		const imageSource = this.config.stillImageSource !== undefined
			? this.config.stillImageSource
			: this.config.source;

		debug(`[${this.info.displayName}] Getting snapshot from ${imageSource} @ ${resolution}`);

		return new Promise((resolve, reject) => {
			let imageBuffer = Buffer.alloc(0);
			const ffmpegProcess = spawn(
				CameraAccessory.ffmpegBinary,
				(
					`-loglevel panic ` +
					`${imageSource} ` +
					`-filter:v "scale=${resolution}:force_original_aspect_ratio=increase,crop=${resolution}" ` +
					`-frames:v 1 ` +
					`-t 1 ` +
					`-f image2 - `
				).split(' '),
				{
					shell: true,
					env: process.env
				}
			);

			ffmpegProcess.on('error', error => reject(error));

			ffmpegProcess.stdout.on('data', data => {
				imageBuffer = Buffer.concat([imageBuffer, Buffer.from(data, 'base64')]);
			});

			ffmpegProcess.stdout.on('end', () => resolve(imageBuffer));
		});
	}

	handleStreamRequest(request) {
		const { sessionID, type: requestType } = request;

		if (!sessionID) {
			return;
		}

		if (requestType == "start") {
			this._startStream(sessionID, request);

		} else if (requestType == "stop") {
			this._stopStream(sessionID);
		}
	}

	prepareStream(request) {
		const sessionInfo = {};
		const sessionID = request.sessionID;
		sessionInfo.address = request.targetAddress;

		const response = {};
		const { video, audio } = request;

		if (video) {
			const { port, srtp_key, srtp_salt } = video;

			// SSRC is a 32 bit integer that is unique per stream
			const ssrcSource = crypto.randomBytes(4);
			ssrcSource[0] = 0;
			const ssrc = ssrcSource.readInt32BE(0, true);

			response.video = { port, ssrc, srtp_key, srtp_salt };

			sessionInfo.video_port = port;
			sessionInfo.video_srtp = Buffer.concat([srtp_key, srtp_salt]);
			sessionInfo.video_ssrc = ssrc;
		}

		if (audio) {
			const { port, srtp_key, srtp_salt } = audio;

			// SSRC is a 32 bit integer that is unique per stream
			const ssrcSource = crypto.randomBytes(4);
			ssrcSource[0] = 0;
			const ssrc = ssrcSource.readInt32BE(0, true);

			response.audio = { port, ssrc, srtp_key, srtp_salt };

			sessionInfo.audio_port = port;
			sessionInfo.audio_srtp = Buffer.concat([srtp_key, srtp_salt]);
			sessionInfo.audio_ssrc = ssrc;
		}

		const currentAddress = ip.address();
		const addressResp = {
			address: currentAddress
		};

		if (ip.isV4Format(currentAddress)) {
			addressResp.type = "v4";
		} else {
			addressResp.type = "v6";
		}

		response.address = addressResp;
		this.pendingSessions[sessionID] = sessionInfo;

		return response;
	}

	_startStream(sessionID, request) {
		const sessionInfo = this.pendingSessions[sessionID];
		const { video: videoInfo, audio: audioInfo } = request;

		if (sessionInfo) {
			let {
				maxWidth: width,
				maxHeight: height,
				maxFps,
				maxBitrate: vBitRate,
				vCodec,
				aCodec,
				packetSize
			} = this.config;

			const {
				address: targetAddress,
				video_port: targetVideoPort,
				video_srtp: videoSRTP,
				video_ssrc: videoSSRC,
				audio_port: targetAudioPort,
				audio_srtp: audioSRTP,
				audio_ssrc: audioSSRC
			} = sessionInfo;

			let aBitRate = 32;
			let aSampleRate = 16;

			if (videoInfo) {
				width = videoInfo.width;
				height = videoInfo.height;

				if (videoInfo.fps < maxFps) {
					maxFps = videoInfo.fps;
				}
				if (videoInfo.max_bit_rate < vBitRate) {
					vBitRate = videoInfo.max_bit_rate;
				}
			}

			if (audioInfo) {
				aBitRate = audioInfo.max_bit_rate;
				aSampleRate = audioInfo.sample_rate;
			}

			let ffmpegParams = `-loglevel panic` +
				` ${this.config.source} -map 0:0` +
				` -vcodec ${vCodec}` +
				` -pix_fmt yuv420p` +
				` -r ${maxFps}` +
				` -f rawvideo` +
				` -tune zerolatency` +
				` -vf scale=${width}:${height}` +
				` -b:v ${vBitRate}k` +
				` -bufsize ${vBitRate}k` +
				` -maxrate ${vBitRate}k` +
				` -payload_type 99` +
				` -ssrc ${videoSSRC}` +
				` -f rtp` +
				` -srtp_out_suite AES_CM_128_HMAC_SHA1_80` +
				` -srtp_out_params ${videoSRTP.toString('base64')} ` +
				`srtp://${targetAddress}:${targetVideoPort}` +
				`?rtcpport=${targetVideoPort}` +
				`&localrtcpport=${targetVideoPort}` +
				`&pkt_size=${packetSize}`;

			if (this.config.audioEnabled) {
				ffmpegParams += ` -map 0:1` +
					` -acodec ${aCodec}` +
					` -profile:a aac_eld` +
					` -flags +global_header` +
					` -f null` +
					` -ar ${aSampleRate}k` +
					` -b:a ${aBitRate}k` +
					` -bufsize ${aBitRate}k` +
					` -ac 1` +
					` -payload_type 110` +
					` -ssrc ${audioSSRC}` +
					` -f rtp` +
					` -srtp_out_suite AES_CM_128_HMAC_SHA1_80` +
					` -srtp_out_params ${audioSRTP.toString('base64')} ` +
					`srtp://${targetAddress}:${targetAudioPort}` +
					`?rtcpport=${targetAudioPort}` +
					`&localrtcpport=${targetAudioPort}` +
					`&pkt_size=${packetSize}`;
			}

			const ffmpegProcess = spawn(
				CameraAccessory.ffmpegBinary,
				ffmpegParams.split(' '),
				{
					shell: true,
					env: process.env
				}
			);

			debug(`Start streaming video from ${this.info.displayName} with ${width}x${height} @ ${vBitRate}kBit`);

			// Always setup hook on stderr.
			// Without this streaming stops within one to two minutes.
			ffmpegProcess.stderr.on('data', data => {
				// Do not log to the console if debugging is turned off
				console.log('FFMPEG error: ', data.toString());
			});

			ffmpegProcess.on('error', error => {
				debug('An error occurs while making stream request', error);
			});
			ffmpegProcess.on('close', code => {
				if (code == null || code == 0 || code == 255) {
					debug("Stopped streaming");
				} else {
					debug("FFmpeg exited with code " + code);

					this.streamControllers.forEach(controller => {
						if (controller.sessionID === sessionID) {
							controller.forceStop();
						}
					});
				}
			});
			this.ongoingSessions[sessionID] = ffmpegProcess;
		}

		delete this.pendingSessions[sessionID];
	}

	_stopStream(sessionID) {
		const ffmpegProcess = this.ongoingSessions[sessionID];
		if (ffmpegProcess) {
			ffmpegProcess.kill('SIGTERM');
		}

		delete this.ongoingSessions[sessionID];
	}

	_handleSessionClose(connectionID, events) {
		super._handleSessionClose(events);

		this.streamControllers.forEach(controller => {
			controller.handleCloseConnection(connectionID);
		});
	}
}

CameraAccessory.ffmpegBinary = 'ffmpeg';

module.exports = CameraAccessory;
