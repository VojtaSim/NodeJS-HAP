const dgram = require('dgram');
const EventEmitter = require('events');

class RTPProxy extends EventEmitter {
	constructor(options) {
		super();

		this.type = options.isIPV6 ? 'udp6' : 'udp4';

		this.options = options;
		this.startingPort = 10000;

		this.outgoingAddress = options.outgoingAddress;
		this.outgoingPort = options.outgoingPort;
		this.incomingPayloadType = 0;
		this.outgoingSSRC = options.outgoingSSRC;
		this.disabled = options.disabled;
		this.incomingSSRC = null;
		this.outgoingPayloadType = null;
	}

	async setup() {
		const [
			incomingRTPSocket,
			incomingRTCPSocket
		] = await this.createSocketPair(this.type);

		this.incomingRTPSocket = incomingRTPSocket;
		this.incomingRTCPSocket = incomingRTCPSocket;

		const socket = await this.createSocket(this.type);
		this.outgoingSocket = socket;
		this.onBound();

		return socket;
	}

	destroy() {
		if (this.incomingRTPSocket) {
			this.incomingRTPSocket.close();
		}

		if (this.incomingRTCPSocket) {
			this.incomingRTCPSocket.close();
		}

		if (this.outgoingSocket) {
			this.outgoingSocket.close();
		}
	}

	/**
	 * Returns port number of incoming RTP socket
	 *
	 * @returns {number}
	 */
	get incomingRTPPort() {
		return this.incomingRTPSocket.address().port;
	}

	/**
	 * Returns port number of incoming RTCP socket
	 *
	 * @returns {number}
	 */
	get incomingRTCPPort() {
		return this.incomingRTCPSocket.address().port;
	}

	/**
	 * Returns port number of outgoing socket
	 *
	 * @returns {number}
	 */
	get outgoingLocalPort() {
		return this.outgoingSocket.address().port;
	}

	/**
	 * Returns server address
	 *
	 * @returns {string}
	 */
	set serverAddress(address) {
		this.serverAddress = address;
	}

	set serverRTPPort(port) {
		this.serverRTPPort = port;
	}

	set serverRTCPPort(port) {
		this.serverRTCPPort = port;
	}

	set incomingPayloadType(payloadType) {
		this.incomingPayloadType = payloadType;
	}

	set outgoingPayloadType(payloadType) {
		this.outgoingPayloadType = payloadType;
	}

	sendOut(message) {
		if (!this.outgoingAddress || !this.outgoingPort) {
			return;
		}
		this.outgoingSocket.send(message, this.outgoingPort, this.outgoingAddress);
	}

	sendBack(message) {
		if (!this.serverAddress || !this.serverRTCPPort) {
			return;
		}
		this.outgoingSocket.send(message, this.serverRTCPPort, this.serverAddress);
	}

	onBound() {
		if (this.disabled) {
			return;
		}
		this.incomingRTPSocket.on('message', message => this.rtpMessage(message));
		this.incomingRTCPSocket.on('message', message => this.rtcpMessage(message));
		this.outgoingSocket.on('message', message => this.rtcpReply(message));
	}

	rtpMessage(message) {
		if (message.length < 12) {
			// Not a proper RTP packet. Just forward it.
			this.sendOut(message);
			return;
		}

		let mpt = message.readUInt8(1);
		let pt = mpt & 0x7F;
		if (pt == this.incomingPayloadType) {
			mpt = (mpt & 0x80) | this.outgoingPayloadType;
			message.writeUInt8(mpt, 1);
		}

		if (this.incomingSSRC === null) {
			this.incomingSSRC = message.readUInt32BE(4);
		}

		message.writeUInt32BE(this.outgoingSSRC, 8);
		this.sendOut(message);
	}

	processRTCPMessage(msg, transform) {

		let rtcpPackets = [];
		let offset = 0;
		while ((offset + 4) <= msg.length) {
			let pt = msg.readUInt8(offset + 1);
			let len = msg.readUInt16BE(offset + 2) * 4;
			if ((offset + 4 + len) > msg.length)
				break;
			let packet = msg.slice(offset, offset + 4 + len);

			packet = transform(pt, packet);

			if (packet)
				rtcpPackets.push(packet);

			offset += 4 + len;
		}

		if (rtcpPackets.length > 0)
			return Buffer.concat(rtcpPackets);

		return null;
	}

	rtcpMessage(msg) {


		let processed = this.processRTCPMessage(msg, function (pt, packet) {
			if (pt != 200 || packet.length < 8)
				return packet;

			if (this.incomingSSRC === null)
				this.incomingSSRC = packet.readUInt32BE(4);
			packet.writeUInt32BE(this.outgoingSSRC, 4);
			return packet;
		});

		if (processed)
			this.sendOut(processed);
	}

	rtcpReply(msg) {


		let processed = this.processRTCPMessage(msg, function (pt, packet) {
			if (pt != 201 || packet.length < 12)
				return packet;

			// Assume source 1 is the one we want to edit.
			packet.writeUInt32BE(this.incomingSSRC, 8);
			return packet;
		});


		if (processed)
			this.sendOut(processed);
	}

	createSocket(type) {

		return new Promise(resolve => {
			const retry = function () {
				const socket = dgram.createSocket(type);

				socket.once('error', () => {
					if (this.startingPort === 65535) {
						this.startingPort = 10000;
					} else {
						++this.startingPort;
					}

					socket.close();
					retry();
				});

				socket.on('listening', () => resolve(socket));
				socket.bind(this.startingPort);
			};

			retry();
		});
	}

	/**
	 * 
	 * @param {string} type 
	 * @returns {Promise}
	 */
	createSocketPair(type) {
		return new Promise(resolve => {
			const retry = function () {
				const socket1 = dgram.createSocket(type);
				const socket2 = dgram.createSocket(type);
				const state = { socket1: 0, socket2: 0 };

				const recheck = function () {
					if (state.socket1 == 0 || state.socket2 == 0) {
						return;
					}

					if (state.socket1 == 2 && state.socket2 == 2) {
						resolve([socket1, socket2]);
						return;
					}

					if (this.startingPort === 65534) {
						this.startingPort = 10000;
					} else {
						++this.startingPort;
					}

					socket1.close();
					socket2.close();

					retry(this.startingPort);
				}

				socket1.once('error', () => {
					state.socket1 = 1;
					recheck();
				});

				socket2.once('error', () => {
					state.socket2 = 1;
					recheck();
				});

				socket1.once('listening', () => {
					state.socket1 = 2;
					recheck();
				});

				socket2.once('listening', () => {
					state.socket2 = 2;
					recheck();
				});

				socket1.bind(this.startingPort);
				socket2.bind(this.startingPort + 1);
			}

			retry();
		});
	}
}

module.exports = RTPProxy;
