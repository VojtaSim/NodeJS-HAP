'use strict';

const debug = require('debug')('StreamController');
const tlv = require('../encyption/tlv');
const Service = require('../Service');
const Characteristic = require('../Characteristic');
const RTPProxy = require('./RTPProxy');
const crypto = require('crypto');
const ip = require('ip');

const HomeKitCharacteristics = require('../../generated/HomeKitCharacteristics');
const HomeKitServices = require('../../generated/HomeKitServices');

class StreamController {

	constructor(identifier, options, cameraSource) {
		if (identifier === undefined) {
			throw new Error('Identifier cannot be undefined');
		}

		if (!options) {
			throw new Error('Options cannot be undefined');
		}

		if (!cameraSource) {
			throw new Error('CameraSource cannot be undefined');
		}

		this.identifier = identifier;
		this.cameraSource = cameraSource;

		this.requiresProxy = options.proxy || false;
		this.disableAudioProxy = options.disableAudioProxy || false;

		this.supportSRTP = options.srtp || false;
		this.supportedRTPConfiguration = this._supportedRTPConfiguration(this.supportSRTP);

		const { video, audio } = options;
		if (!video) {
			throw new Error('Video parameters cannot be undefined in options.');
		}
		if (!audio) {
			throw new Error('Audio parameters cannot be undefined in options');
		}
		
		this.supportedVideoStreamConfiguration = this._supportedVideoStreamConfiguration(video);
		this.supportedAudioStreamConfiguration = this._supportedAudioStreamConfiguration(audio);

		this.selectedConfiguration = null;
		this.sessionIdentifier = null;
		this.streamStatus = StreamController.StreamingStatus.AVAILABLE;
		this.videoOnly = false;

		this._createService();
	}

	forceStop() {
		this.connectionID = undefined;
		this._handleStopStream(undefined, true);
	}

	/**
	 * Handles event when an individual connection of a HAPServer closes.
	 * If a stream is transmitted over the closed connection it's stopped.
	 * 
	 * @param {string} connectionID
	 */
	handleCloseConnection(connectionID) {
		if (this.connectionID && this.connectionID == connectionID) {
			this.connectionID = undefined;
			this._handleStopStream();
		}
	}

	/**
	 * Constructs CameraRTPStreamManagement services and sets up all of its
	 * required characteristics and read/write handlers.
	 */
	_createService() {
		const managementService = new Service.CameraRTPStreamManagement(
			undefined,
			this.identifier.toString()
		);

		managementService
			.getCharacteristic(Characteristic.StreamingStatus)
			.onGet(async () => {
				const data = tlv.encode({
					[0x01]: this.streamStatus
				});
				return data.toString('base64');
			});

		managementService
			.getCharacteristic(Characteristic.SupportedRTPConfiguration)
			.onGet(async () => this.supportedRTPConfiguration);

		managementService
			.getCharacteristic(Characteristic.SupportedVideoStreamConfiguration)
			.onGet(async () => this.supportedVideoStreamConfiguration);

		managementService
			.getCharacteristic(Characteristic.SupportedAudioStreamConfiguration)
			.onGet(async () => this.supportedAudioStreamConfiguration);

		managementService
			.getCharacteristic(Characteristic.SelectedStreamConfiguration)
			.onGet(async () => {
				debug(`[${this.identifier}] Read SelectedStreamConfiguration`);
				return this.selectedConfiguration;
			})
			.onSet(async (value, context, connectionID) => {
				debug(`[${this.identifier}] Write SelectedStreamConfiguration`);
				await this._handleSelectedStreamConfigurationWrite(value, connectionID);
			});

		managementService
			.getCharacteristic(Characteristic.SetupEndpoints)
			.onGet(async () => this._handleSetupRead())
			.onSet(async (value) => await this._handleSetupWrite(value));

		this.service = managementService;
	}

	/**
	 * Handles selection of the stream configuration.
	 *
	 * @param {Buffer} value TLV8 encoded configuration data.
	 * @param {string} connectionID ID of the connection the request is made 
	 *        through
	 */
	_handleSelectedStreamConfigurationWrite(value, connectionID) {
		this.selectedConfiguration = value;
		const data = tlv.decode(Buffer.from(value, 'base64'));

		if (data[StreamController.SelectedStreamConfigurationTypes.SESSION]) {
			const session = tlv.decode(data[StreamController.SelectedStreamConfigurationTypes.SESSION]);
			this.sessionIdentifier = session[0x01];
			const requestType = session[0x02][0];

			switch (requestType) {
				case 1: {
					if (this.connectionID && this.connectionID != connectionID) {
						debug("Received start stream request from a different connection.");
					} else {
						this.connectionID = connectionID;
					}
	
					this._handleStartStream(data, session, false);
				}
				case 0: {
					if (this.connectionID && this.connectionID != connectionID) {
						debug("Received stop stream request from a different connection.")
					} else {
						this.connectionID = undefined;
					}
	
					this._handleStopStream();
				}
				case 4: {
					this._handleStartStream(data, session, true);
				}
				default: {
					debug("Unhandled request type: ", requestType);
				}
			}
		} else {
			debug("Unexpected request for Selected Stream Configuration");
		}
	}

	/**
	 * Creates a stream request that is later processed by the parent camera
	 * source and sets the status of the stream to 'streaming'.
	 *
	 * @param {Buffer} data TLV8 encoded data object
	 * @param {Object} session 
	 * @param {boolean} reconfigure Whether the stream should be only updated
	 *        instead of started again.
	 */
	_handleStartStream(data, session, reconfigure = false) {
		const request = {
			sessionID: this.sessionIdentifier,
			type: !reconfigure ? "start" : "reconfigure"
		};

		let videoPT = null;
		let audioPT = null;

		if (data[StreamController.SelectedStreamConfigurationTypes.VIDEO]) {
			const videoInfo = {};
			const video = tlv.decode(data[StreamController.SelectedStreamConfigurationTypes.VIDEO]);

			if (video[StreamController.VideoTypes.CODEC_PARAM]) {
				const videoCodecParamsTLV = tlv.decode(video[StreamController.VideoTypes.CODEC_PARAM]);
				
				videoInfo.profile = videoCodecParamsTLV[StreamController.VideoCodecParamTypes.PROFILE_ID].readUInt8(0);
				videoInfo.level = videoCodecParamsTLV[StreamController.VideoCodecParamTypes.LEVEL].readUInt8(0);
			}

			if (video[StreamController.VideoTypes.ATTRIBUTES]) {
				const videoAttrTLV = tlv.decode(video[StreamController.VideoTypes.ATTRIBUTES]);

				videoInfo.width = videoAttrTLV[StreamController.VideoAttributesTypes.IMAGE_WIDTH].readUInt16LE(0);
				videoInfo.height = videoAttrTLV[StreamController.VideoAttributesTypes.IMAGE_HEIGHT].readUInt16LE(0);
				videoInfo.fps = videoAttrTLV[StreamController.VideoAttributesTypes.FRAME_RATE].readUInt8(0);
			}

			if (video[StreamController.VideoTypes.RTP_PARAM]) {
				const videoRTPParamsTLV = tlv.decode(video[StreamController.VideoTypes.RTP_PARAM]);

				if (videoRTPParamsTLV[StreamController.RTPParamTypes.SYNCHRONIZATION_SOURCE]) {
					videoInfo.ssrc = videoRTPParamsTLV[StreamController.RTPParamTypes.SYNCHRONIZATION_SOURCE].readUInt32LE(0);
				}

				if (videoRTPParamsTLV[StreamController.RTPParamTypes.PAYLOAD_TYPE]) {
					videoInfo.pt = videoRTPParamsTLV[StreamController.RTPParamTypes.PAYLOAD_TYPE].readUInt8(0);
				}

				if (videoRTPParamsTLV[StreamController.RTPParamTypes.MAX_BIT_RATE]) {
					videoInfo.max_bit_rate = videoRTPParamsTLV[StreamController.RTPParamTypes.MAX_BIT_RATE].readUInt16LE(0);
				}

				if (videoRTPParamsTLV[StreamController.RTPParamTypes.RTCP_SEND_INTERVAL]) {
					videoInfo.rtcp_interval = videoRTPParamsTLV[StreamController.RTPParamTypes.RTCP_SEND_INTERVAL].readUInt32LE(0);
				}

				if (videoRTPParamsTLV[StreamController.RTPParamTypes.MAX_MTU]) {
					videoInfo.mtu = videoRTPParamsTLV[StreamController.RTPParamTypes.MAX_MTU].readUInt16LE(0);
				}
			}

			request.video = videoInfo;
		}

		if (data[StreamController.SelectedStreamConfigurationTypes.AUDIO]) {
			const audioInfo = {};
			const audio = tlv.decode(data[StreamController.SelectedStreamConfigurationTypes.AUDIO]);

			const codec = audio[StreamController.AudioTypes.CODEC];
			const audioCodecParamsTLV = tlv.decode(audio[StreamController.AudioTypes.CODEC_PARAM]);
			const audioRTPParamsTLV = tlv.decode(audio[StreamController.AudioTypes.RTP_PARAM]);
			// const comfortNoise = tlv.decode(audio[StreamController.AudioTypes.COMFORT_NOISE]);

			let audioCodec = codec.readUInt8(0);
			if (audioCodec !== undefined) {
				if (audioCodec == StreamController.AudioCodecTypes.OPUS) {
					audioInfo.codec = "OPUS";

				} else if (audioCodec == StreamController.AudioCodecTypes.AACELD) {
					audioInfo.codec = "AAC-eld";

				} else {
					debug("Unexpected audio codec: %s", audioCodec);
					audioInfo.codec = audioCodec;
				}
			}

			audioInfo.channel = audioCodecParamsTLV[StreamController.AudioCodecParamTypes.CHANNEL].readUInt8(0);
			audioInfo.bit_rate = audioCodecParamsTLV[StreamController.AudioCodecParamTypes.BIT_RATE].readUInt8(0);

			const sampleRateEnum = audioCodecParamsTLV[StreamController.AudioCodecParamTypes.SAMPLE_RATE].readUInt8(0);
			if (sampleRateEnum !== undefined) {
				if (sampleRateEnum === StreamController.AudioCodecParamSampleRateTypes.KHZ_8) {
					audioInfo.sample_rate = 8;

				} else if (sampleRateEnum === StreamController.AudioCodecParamSampleRateTypes.KHZ_16) {
					audioInfo.sample_rate = 16;

				} else if (sampleRateEnum === StreamController.AudioCodecParamSampleRateTypes.KHZ_24) {
					audioInfo.sample_rate = 24;

				} else {
					debug("Unexpected audio sample rate: %s", sampleRateEnum);
				}
			}

			audioInfo.packet_time = audioCodecParamsTLV[StreamController.AudioCodecParamTypes.PACKET_TIME].readUInt8(0);

			const ssrc = audioRTPParamsTLV[StreamController.RTPParamTypes.SYNCHRONIZATION_SOURCE].readUInt32LE(0);
			audioPT = audioRTPParamsTLV[StreamController.RTPParamTypes.PAYLOAD_TYPE].readUInt8(0);

			audioInfo.pt = audioPT;
			audioInfo.ssrc = ssrc;
			audioInfo.max_bit_rate = audioRTPParamsTLV[StreamController.RTPParamTypes.MAX_BIT_RATE].readUInt16LE(0);
			audioInfo.rtcp_interval = audioRTPParamsTLV[StreamController.RTPParamTypes.RTCP_SEND_INTERVAL].readUInt32LE(0);
			audioInfo.comfort_pt = audioRTPParamsTLV[StreamController.RTPParamTypes.COMFORT_NOISE_PAYLOAD_TYPE].readUInt8(0);

			request.audio = audioInfo;
		}

		if (!reconfigure && this.requiresProxy) {
			this.videoProxy.setOutgoingPayloadType(videoPT);
			if (!this.disableAudioProxy) {
				this.audioProxy.setOutgoingPayloadType(audioPT);
			}
		}

		this.cameraSource.handleStreamRequest(request);
		this._updateStreamStatus(StreamController.StreamingStatus.STREAMING);
	}

	/**
	 * Stops stream and frees video and audio proxies if they were used.
	 *
	 * @param {*} silent Whether the request should not be propagated to camera
	 *        source.
	 */
	_handleStopStream(silent) {
		const request = {
			sessionID: this.sessionIdentifier,
			type: "stop"
		};

		if (!silent) {
			this.cameraSource.handleStreamRequest(request);
		}

		if (this.requiresProxy) {
			this.videoProxy.destroy();

			if (!this.disableAudioProxy) {
				this.audioProxy.destroy();
			}

			this.videoProxy = undefined;
			this.audioProxy = undefined;
		}

		this._updateStreamStatus(StreamController.StreamingStatus.AVAILABLE);
	}

	/**
	 * Handler for returning internally stored setup response.
	 */
	async _handleSetupRead() {
		debug(`[${this.identifier}] Setup Read`);
		return this.setupResponse;
	}
	
	/**
	 * Generates a response for the setup request, containing IP address and
	 * port information.
	 * 
	 * @param {string} value TLV8 encoded string.
	 */
	async _handleSetupWrite(data) {
		data = tlv.decode(Buffer.from(data, 'base64'));
		this.sessionIdentifier = data[StreamController.SetupTypes.SESSION_ID];

		// Address
		const targetAddressPayload = data[StreamController.SetupTypes.ADDRESS];
		const processedAddressInfo = tlv.decode(targetAddressPayload);
		const isIPv6 = processedAddressInfo[StreamController.SetupAddressInfo.ADDRESS_VER][0];
		const targetAddress = processedAddressInfo[StreamController.SetupAddressInfo.ADDRESS].toString('utf8');
		const targetVideoPort = processedAddressInfo[StreamController.SetupAddressInfo.VIDEO_RTP_PORT].readUInt16LE(0);
		const targetAudioPort = processedAddressInfo[StreamController.SetupAddressInfo.AUDIO_RTP_PORT].readUInt16LE(0);

		// Video SRTP Params
		const videoSRTPPayload = data[StreamController.SetupTypes.VIDEO_SRTP_PARAM];
		const processedVideoInfo = tlv.decode(videoSRTPPayload);
		const videoCryptoSuite = processedVideoInfo[StreamController.SetupSRTP_PARAM.CRYPTO][0];
		const videoMasterKey = processedVideoInfo[StreamController.SetupSRTP_PARAM.MASTER_KEY];
		const videoMasterSalt = processedVideoInfo[StreamController.SetupSRTP_PARAM.MASTER_SALT];

		// Audio SRTP Params
		const audioSRTPPayload = data[StreamController.SetupTypes.AUDIO_SRTP_PARAM];
		const processedAudioInfo = tlv.decode(audioSRTPPayload);
		const audioCryptoSuite = processedAudioInfo[StreamController.SetupSRTP_PARAM.CRYPTO][0];
		const audioMasterKey = processedAudioInfo[StreamController.SetupSRTP_PARAM.MASTER_KEY];
		const audioMasterSalt = processedAudioInfo[StreamController.SetupSRTP_PARAM.MASTER_SALT];

		debug(
			'\nSession: ', this.sessionIdentifier,
			'\nControllerAddress: ', targetAddress,
			'\nVideoPort: ', targetVideoPort,
			'\nAudioPort: ', targetAudioPort,
			'\nVideo Crypto: ', videoCryptoSuite,
			'\nVideo Master Key: ', videoMasterKey,
			'\nVideo Master Salt: ', videoMasterSalt,
			'\nAudio Crypto: ', audioCryptoSuite,
			'\nAudio Master Key: ', audioMasterKey,
			'\nAudio Master Salt: ', audioMasterSalt
		);

		const request = {
			sessionID: this.sessionIdentifier,
		};
		const videoInfo = {};
		const audioInfo = {};

		if (this.supportSRTP) {
			videoInfo.srtp_key = videoMasterKey;
			videoInfo.srtp_salt = videoMasterSalt;

			audioInfo.srtp_key = audioMasterKey;
			audioInfo.srtp_salt = audioMasterSalt;
		}

		if (!this.requiresProxy) {
			request.targetAddress = targetAddress;

			videoInfo.port = targetVideoPort;
			audioInfo.port = targetAudioPort;

			request.video = videoInfo;
			request.audio = audioInfo;

			this._generateSetupResponse(
				this.sessionIdentifier,
				this.cameraSource.prepareStream(request)
			);
		} else {
			request.targetAddress = ip.address();
			const promises = [];

			const videoSSRCNumber = crypto.randomBytes(4).readUInt32LE(0);
			this.videoProxy = new RTPProxy({
				outgoingAddress: targetAddress,
				outgoingPort: targetVideoPort,
				outgoingSSRC: videoSSRCNumber,
				disabled: false
			});

			promises.push(this.videoProxy.setup());

			if (!this.disableAudioProxy) {
				const audioSSRCNumber = crypto.randomBytes(4).readUInt32LE(0);
				this.audioProxy = new RTPProxy({
					outgoingAddress: targetAddress,
					outgoingPort: targetAudioPort,
					outgoingSSRC: audioSSRCNumber,
					disabled: this.videoOnly
				});

				promises.push(this.audioProxy.setup());
			} else {
				audioInfo.port = targetAudioPort;
				audioInfo.targetAddress = targetAddress;
			}

			await Promise.all(promises);

			videoInfo.proxy_rtp = this.videoProxy.incomingRTPPort();
			videoInfo.proxy_rtcp = this.videoProxy.incomingRTCPPort();

			if (!this.disableAudioProxy) {
				audioInfo.proxy_rtp = this.audioProxy.incomingRTPPort();
				audioInfo.proxy_rtcp = this.audioProxy.incomingRTCPPort();
			}

			request.video = videoInfo;
			request.audio = audioInfo;

			this._generateSetupResponse(
				this.sessionIdentifier,
				this.cameraSource.prepareStream(request)
			);
		}
	}

	/**
	 * Constructs setup response from a stream preparation response
	 *
	 * @param {string} identifier
	 * @param {Object} response
	 */
	_generateSetupResponse(identifier, response) {
		const { video, audio } = response;

		let ipVer = 0;
		let ipAddress = null;
		const videoPort = Buffer.alloc(2);
		const audioPort = Buffer.alloc(2);

		const videoSSRC = Buffer.alloc(4);
		const audioSSRC = Buffer.alloc(4);

		let videoSRTP = Buffer.from([0x01, 0x01, 0x02, 0x02, 0x00, 0x03, 0x00]);
		let audioSRTP = Buffer.from([0x01, 0x01, 0x02, 0x02, 0x00, 0x03, 0x00]);

		if (this.requiresProxy) {
			const currentAddress = ip.address();
			ipAddress = Buffer.from(currentAddress);
			ipVer = ip.isV4Format(currentAddress) ? 0 : 1;

			this.videoProxy.setIncomingPayloadType(video.proxy_pt);
			this.videoProxy.setServerAddress(video.proxy_server_address);
			this.videoProxy.setServerRTPPort(video.proxy_server_rtp);
			this.videoProxy.setServerRTCPPort(video.proxy_server_rtcp);

			videoPort.writeUInt16LE(this.videoProxy.outgoingLocalPort(), 0);
			videoSSRC.writeUInt32LE(this.videoProxy.outgoingSSRC, 0);

			if (!this.disableAudioProxy) {
				this.audioProxy.setIncomingPayloadType(audio.proxy_pt);
				this.audioProxy.setServerAddress(audio.proxy_server_address);
				this.audioProxy.setServerRTPPort(audio.proxy_rtp);
				this.audioProxy.setServerRTCPPort(audio.proxy_server_rtcp);

				audioPort.writeUInt16LE(this.audioProxy.outgoingLocalPort(), 0);
				audioSSRC.writeUInt32LE(this.audioProxy.outgoingSSRC, 0);
			} else {
				audioPort.writeUInt16LE(audio.port, 0);
				audioSSRC.writeUInt32LE(audio.ssrc, 0);
			}

		} else {
			const { address, video, audio } = response;
			ipVer = address.type == "v6" ? 1 : 0;
			ipAddress = address.address;

			videoPort.writeUInt16LE(video.port, 0);
			videoSSRC.writeUInt32LE(video.ssrc, 0);

			audioPort.writeUInt16LE(audio.port, 0);
			audioSSRC.writeUInt32LE(audio.ssrc, 0);

			if (this.supportSRTP) {
				videoSRTP = tlv.encode({
					[StreamController.SetupSRTP_PARAM.CRYPTO]: StreamController.SRTPCryptoSuites.AES_CM_128_HMAC_SHA1_80,
					[StreamController.SetupSRTP_PARAM.MASTER_KEY]: video.srtp_key,
					[StreamController.SetupSRTP_PARAM.MASTER_SALT]: video.srtp_salt
				});

				audioSRTP = tlv.encode({
					[StreamController.SetupSRTP_PARAM.CRYPTO]: StreamController.SRTPCryptoSuites.AES_CM_128_HMAC_SHA1_80,
					[StreamController.SetupSRTP_PARAM.MASTER_KEY]: audio.srtp_key,
					[StreamController.SetupSRTP_PARAM.MASTER_SALT]: audio.srtp_salt
				});
			}
		}

		const addressTLV = tlv.encode({
			[StreamController.SetupAddressInfo.ADDRESS_VER]: ipVer,
			[StreamController.SetupAddressInfo.ADDRESS]: ipAddress,
			[StreamController.SetupAddressInfo.VIDEO_RTP_PORT]: videoPort,
			[StreamController.SetupAddressInfo.AUDIO_RTP_PORT]: audioPort
		});

		const responseTLV = tlv.encode({
			[StreamController.SetupTypes.SESSION_ID]: identifier,
			[StreamController.SetupTypes.STATUS]: StreamController.SetupStatus.SUCCESS,
			[StreamController.SetupTypes.ADDRESS]: addressTLV,
			[StreamController.SetupTypes.VIDEO_SRTP_PARAM]: videoSRTP,
			[StreamController.SetupTypes.AUDIO_SRTP_PARAM]: audioSRTP,
			[StreamController.SetupTypes.VIDEO_SSRC]: videoSSRC,
			[StreamController.SetupTypes.AUDIO_SSRC]: audioSSRC
		});

		this.setupResponse = responseTLV.toString('base64');
	}

	/**
	 * Updates internal stream status flag and StreamingStatus characteristic
	 * value.
	 * 
	 * @param {number} status
	 */
	_updateStreamStatus(status) {
		this.streamStatus = status;

		this.service
			.getCharacteristic(Characteristic.StreamingStatus)
			.setValue(
				tlv
					.encode({ [0x01]: this.streamStatus })
					.toString('base64')
			);
	}

	
	_supportedRTPConfiguration(supportSRTP) {
		const cryptoSuite = StreamController.SRTPCryptoSuites.AES_CM_128_HMAC_SHA1_80;

		if (!supportSRTP) {
			cryptoSuite = StreamController.SRTPCryptoSuites.NONE;
			debug("Client claims it doesn't support SRTP. The stream may stops working with future iOS releases.");
		}

		return tlv.encode({
			[StreamController.RTPConfigTypes.CRYPTO]: cryptoSuite
		}).toString('base64');
	}

	_supportedVideoStreamConfiguration(videoParams) {
		const { codec, resolutions } = videoParams;

		if (!codec) {
			throw new Error('Video codec cannot be undefined');
		}

		if (!resolutions) {
			throw new Error('Video resolutions cannot be undefined');
		}

		let videoCodecParamsTLV = tlv.encode({
			[StreamController.VideoCodecParamTypes.PACKETIZATION_MODE]: StreamController.VideoCodecParamPacketizationModeTypes.NON_INTERLEAVED
		});

		const { profiles, levels } = codec;

		profiles.forEach(value => {
			const tlvBuffer = tlv.encode({
				[StreamController.VideoCodecParamTypes.PROFILE_ID]: value
			});
			videoCodecParamsTLV = Buffer.concat([videoCodecParamsTLV, tlvBuffer]);
		});

		levels.forEach(value => {
			const tlvBuffer = tlv.encode({
				[StreamController.VideoCodecParamTypes.LEVEL]: value
			});
			videoCodecParamsTLV = Buffer.concat([videoCodecParamsTLV, tlvBuffer]);
		});

		let videoAttrsTLV = Buffer.alloc(0);
		resolutions.forEach(resolution => {
			if (resolution.length !== 3) {
				throw new Error('Unexpected video resolution');
			}

			const [width, height, fps] = resolution;
			const imageWidth = Buffer.alloc(2).writeUInt16LE(width, 0);
			const imageHeight = Buffer.alloc(2).writeUInt16LE(height, 0);
			const frameRate = Buffer.alloc(1).writeUInt8(fps);

			const videoAttrTLV = tlv.encode({
				[StreamController.VideoAttributesTypes.IMAGE_WIDTH]: imageWidth,
				[StreamController.VideoAttributesTypes.IMAGE_HEIGHT]: imageHeight,
				[StreamController.VideoAttributesTypes.FRAME_RATE]: frameRate
			});
			const videoAttrBuffer = tlv.encode({
				[StreamController.VideoTypes.ATTRIBUTES]: videoAttrTLV
			});
			videoAttrsTLV = Buffer.concat([videoAttrsTLV, videoAttrBuffer]);
		});

		var configurationTLV = tlv.encode({
			[StreamController.VideoTypes.CODEC]: StreamController.VideoCodecTypes.H264,
			[StreamController.VideoTypes.CODEC_PARAM]: videoCodecParamsTLV
		});

		return tlv.encode({
			[0x01]: Buffer.concat([configurationTLV, videoAttrsTLV])
		}).toString('base64');
	}

	_supportedAudioStreamConfiguration(audioParams) {
		// Only AACELD and OPUS are accepted by iOS currently, and we need to give it something it will accept
		// for it to start the video stream.
		const { comfort_noise, codecs } = audioParams;

		if (!codecs) {
			throw new Error('Audio codecs cannot be undefined');
		}

		const comfortNoiseValue = comfort_noise === true ? 0x01 : 0x00;
		let audioConfigurationsBuffer = Buffer.alloc(0);
		let hasSupportedCodec = false;

		codecs.forEach(codecParam => {
			let codec, bitrate, { type, samplerate } = codecParam;

			switch (type) {
				case 'OPUS': {
					codec = StreamController.AudioCodecTypes.OPUS;
					bitrate = StreamController.AudioCodecParamBitRateTypes.VARIABLE;
					hasSupportedCodec = true;
				}
				case 'AAC-eld': {
					codec = StreamController.AudioCodecTypes.AACELD;
					bitrate = StreamController.AudioCodecParamBitRateTypes.VARIABLE;
					hasSupportedCodec = true;
				}
				default: {
					debug("Unsupported codec: ", param_type);
					return;
				}
			}

			switch (samplerate) {
				case 8: {
					samplerate = StreamController.AudioCodecParamSampleRateTypes.KHZ_8;
				}
				case 16: {
					samplerate = StreamController.AudioCodecParamSampleRateTypes.KHZ_16;
				}
				case 24: {
					samplerate = StreamController.AudioCodecParamSampleRateTypes.KHZ_24;
				}
				default: {
					debug("Unsupported sample rate: ", param_samplerate);
					return;
				}
			}

			const audioParamTLV = tlv.encode({
				[StreamController.AudioCodecParamTypes.CHANNEL]: 1,
				[StreamController.AudioCodecParamTypes.BIT_RATE]: bitrate,
				[StreamController.AudioCodecParamTypes.SAMPLE_RATE]: samplerate
			});

			const audioConfiguration = tlv.encode({
				[StreamController.AudioTypes.CODEC]: codec,
				[StreamController.AudioTypes.CODEC_PARAM]: audioParamTLV
			});

			audioConfigurationsBuffer = Buffer.concat([
				audioConfigurationsBuffer, 
				tlv.encode(0x01, audioConfiguration)
			]);
		});

		// If we're not one of the supported codecs
		if (!hasSupportedCodec) {
			debug("Client doesn't support any audio codec that HomeKit supports.");

			const codec = StreamController.AudioCodecTypes.OPUS;
			const bitrate = StreamController.AudioCodecParamBitRateTypes.VARIABLE;
			const samplerate = StreamController.AudioCodecParamSampleRateTypes.KHZ_24;

			const audioParamTLV = tlv.encode({
				[StreamController.AudioCodecParamTypes.CHANNEL]: 1,
				[StreamController.AudioCodecParamTypes.BIT_RATE]: bitrate,
				[StreamController.AudioCodecParamTypes.SAMPLE_RATE]: samplerate
			});

			const audioConfiguration = tlv.encode({
				[StreamController.AudioTypes.CODEC]: codec,
				[StreamController.AudioTypes.CODEC_PARAM]: audioParamTLV
			});

			audioConfigurationsBuffer = tlv.encode({
				[0x01]: audioConfiguration
			});

			// Cannot actually convert to supported audio codec, mark stream
			// that is doesn't support audio
			this.videoOnly = true;
		}

		return Buffer.concat([
			audioConfigurationsBuffer,
			tlv.encode({
				[0x02]: comfortNoiseValue
			})
		]).toString('base64');
	}
}

StreamController.SetupTypes = {
	SESSION_ID: 0x01,
	STATUS: 0x02,
	ADDRESS: 0x03,
	VIDEO_SRTP_PARAM: 0x04,
	AUDIO_SRTP_PARAM: 0x05,
	VIDEO_SSRC: 0x06,
	AUDIO_SSRC: 0x07
}

StreamController.SetupStatus = {
	SUCCESS: 0x00,
	BUSY: 0x01,
	ERROR: 0x02
}

StreamController.SetupAddressVer = {
	IPV4: 0x00,
	IPV6: 0x01
}

StreamController.SetupAddressInfo = {
	ADDRESS_VER: 0x01,
	ADDRESS: 0x02,
	VIDEO_RTP_PORT: 0x03,
	AUDIO_RTP_PORT: 0x04
}

StreamController.SetupSRTP_PARAM = {
	CRYPTO: 0x01,
	MASTER_KEY: 0x02,
	MASTER_SALT: 0x03
}

StreamController.StreamingStatus = {
	AVAILABLE: 0x00,
	STREAMING: 0x01,
	BUSY: 0x02
}

StreamController.RTPConfigTypes = {
	CRYPTO: 0x02
}

StreamController.SRTPCryptoSuites = {
	AES_CM_128_HMAC_SHA1_80: 0x00,
	AES_CM_256_HMAC_SHA1_80: 0x01,
	NONE: 0x02
}

StreamController.VideoTypes = {
	CODEC: 0x01,
	CODEC_PARAM: 0x02,
	ATTRIBUTES: 0x03,
	RTP_PARAM: 0x04
}

StreamController.VideoCodecTypes = {
	H264: 0x00
}

StreamController.VideoCodecParamTypes = {
	PROFILE_ID: 0x01,
	LEVEL: 0x02,
	PACKETIZATION_MODE: 0x03,
	CVO_ENABLED: 0x04,
	CVO_ID: 0x05
}

StreamController.VideoCodecParamCVOTypes = {
	UNSUPPORTED: 0x01,
	SUPPORTED: 0x02
}

StreamController.VideoCodecParamProfileIDTypes = {
	BASELINE: 0x00,
	MAIN: 0x01,
	HIGH: 0x02
}

StreamController.VideoCodecParamLevelTypes = {
	TYPE3_1: 0x00,
	TYPE3_2: 0x01,
	TYPE4_0: 0x02
}

StreamController.VideoCodecParamPacketizationModeTypes = {
	NON_INTERLEAVED: 0x00
}

StreamController.VideoAttributesTypes = {
	IMAGE_WIDTH: 0x01,
	IMAGE_HEIGHT: 0x02,
	FRAME_RATE: 0x03
}

StreamController.SelectedStreamConfigurationTypes = {
	SESSION: 0x01,
	VIDEO: 0x02,
	AUDIO: 0x03
}

StreamController.RTPParamTypes = {
	PAYLOAD_TYPE: 0x01,
	SYNCHRONIZATION_SOURCE: 0x02,
	MAX_BIT_RATE: 0x03,
	RTCP_SEND_INTERVAL: 0x04,
	MAX_MTU: 0x05,
	COMFORT_NOISE_PAYLOAD_TYPE: 0x06
}

StreamController.AudioTypes = {
	CODEC: 0x01,
	CODEC_PARAM: 0x02,
	RTP_PARAM: 0x03,
	COMFORT_NOISE: 0x04
}

StreamController.AudioCodecTypes = {
	PCMU: 0x00,
	PCMA: 0x01,
	AACELD: 0x02,
	OPUS: 0x03
}

StreamController.AudioCodecParamTypes = {
	CHANNEL: 0x01,
	BIT_RATE: 0x02,
	SAMPLE_RATE: 0x03,
	PACKET_TIME: 0x04
}

StreamController.AudioCodecParamBitRateTypes = {
	VARIABLE: 0x00,
	CONSTANT: 0x01
}

StreamController.AudioCodecParamSampleRateTypes = {
	KHZ_8: 0x00,
	KHZ_16: 0x01,
	KHZ_24: 0x02
}

module.exports = StreamController;
