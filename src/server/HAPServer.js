const HAPConnection = require('./HAPConnection');
const HAPRequestData = require('./HAPRequestData');

const EventEmitter = require('events');
const URL = require('url').URL;
const net = require('net');
const debug = require('debug')('HAPServer');
const crypto = require('crypto');
const srp = require('fast-srp-hap');
const ed25519 = require('ed25519-hap');
const HKDF = require('../encryption/hkdf');
const tlv = require('../encryption/tlv');
const encryption = require('../encryption/encryption');

/**
 * The actual HAP server that iOS devices talk to.
 *
 * Notes
 * -----
 * It turns out that the IP-based version of HomeKit's HAP protocol operates over a sort of pseudo-HTTP.
 * Accessories are meant to host a TCP socket server that initially behaves exactly as an HTTP/1.1 server.
 * So iOS devices will open up a long-lived connection to this server and begin issuing HTTP requests.
 * So far, this conforms with HTTP/1.1 Keepalive. However, after the "pairing" process is complete, the
 * connection is expected to be "upgraded" to support full-packet encryption of both HTTP headers and data.
 * This encryption is NOT SSL. It is a customized ChaCha20+Poly1305 encryption layer.
 *
 * Additionally, this "HTTP Server" supports sending "event" responses at any time without warning. The iOS
 * device simply keeps the connection open after it's finished with HTTP request/response traffic, and while
 * the connection is open, the server can elect to issue "EVENT/1.0 200 OK" HTTP-style responses. These are
 * typically sent to inform the iOS device of a characteristic change for the accessory (like "Door was Unlocked").
 *
 * @fires 'server-listening' Emitted when the server is fully set up and ready to receive connections.
 * @fires 'server-connection-open' Emitted when a new HTTP connection to the server is made.
 * @fires 'server-connection-close' Emitted when the HTTP connection closes.
 * @fires 'server-stop' => Emitted when the server stops and all connections are closed.
 */

class HAPServer extends EventEmitter {

	/**
	 * @param {Accessory} accessory
	 */
	constructor(accessory, allowInsecureRequest = false) {
		super();
		this.accessory = accessory;
		this.allowInsecureRequest = allowInsecureRequest;
	}

	/**
	 * Starts listening for a new connection on the TCP server
	 *
	 * @param {number} targetPort 
	 * @fires 'server-listening' Emitted when the server is fully set up and ready to receive connections.
	 */
	listen(targetPort) {
		this._tcpServer = net.createServer();
		this._connections = []; // track all open connections

		// so iOS is very reluctant to actually disconnect HAP connections (as 
		// in, sending a FIN packet). For instance, if you turn off wifi on 
		// your phone, it will not close the connection, instead it will leave 
		// it open and hope that it's still valid when it returns to the 
		// network. And Node, by itself, does not ever "discover" that the 
		// connection has been closed behind it, until a potentially very long 
		// system-level socket timeout (like, days). To work around this, we 
		// have invented a manual "keepalive" mechanism where we send "empty" 
		// events perodicially, such that when Node attempts to write to the 
		// socket, it discovers that it's been disconnected after an additional
		// one-minute timeout (this timeout appears to be hardcoded).
		this._keepAliveTimerID = setInterval(
			() => this._onKeepAliveTimerTick(),
			1000 * 60 * 10	// 10 minutes
		);

		this._tcpServer.on('connection', socket => this._onConnection(socket));
		this._tcpServer.on('listening', () => {
			const {  port } = this._tcpServer.address();
			debug(`Server listening on port %s`, port);

			this.emit('server-listening', port);
		});

		this._tcpServer.listen(targetPort);
	}

	/**
	 * Closes all connections to the TPC server and clears our keep-alive
	 * workaround interval
	 *
	 * @fires 'server-stop' => Emitted when the server stops and all connections are closed.
	 */
	stop() {
		debug(`[${this.accessory.info.displayName}] Stopping HAPServer.`);

		this._tcpServer.close();
		this._connections = [];
		clearInterval(this._keepAliveTimerID);

		this._tcpServer.on('close', () => this.emit('server-stop'));
	}

	/**
	 * Notifies connected clients who have subscribed to a particular event.
	 *
	 * @param {String} event - the name of the event (only clients who have subscribed to this name will be notified)
	 * @param {Object} data - the object containing the event data; will be JSON.stringify'd automatically
	 */
	notifyClients(event, data, excludeEvents) {
		// encode notification data as JSON, set content-type, and hand it off to the server.
		this._sendEventToActiveConnections(event, JSON.stringify(data), "application/hap+json", excludeEvents);
	}

	/**
	 * Called by net.Server when a new client connects. We will set up a new 
	 * HAPConnection to manage the lifetime of this connection.
	 *
	 * @param {net.Socket} socket
	 * @fires 'server-connection-open' Emitted when a new HTTP connection to the server is made.
	 */
	_onConnection(socket) {
		const connection = new HAPConnection(socket);
		this.emit('server-connection-open', connection, socket);

		// pass on session events to our listeners directly
		connection.on('request', (request, response, session, events) => this._onRequest(request, response, session, events));
		connection.on('close', (events) => this._handleConnectionClose(connection, events));
		this._connections.push(connection);
	}

	/**
	 * Removes closed connection from the list of connections.
	 *
	 * @param {HAPConnection} connection
	 * @param {Object<string, boolean>} events
	 * @fires 'server-connection-close' Emitted when the HTTP connection closes.
	 */
	_handleConnectionClose(connection, events) {
		this.emit('server-connection-close', connection, events);

		this._connections.splice(this._connections.indexOf(connection), 1);
	}

	/**
	 * Called when an HTTP request was detected.
	 *
	 * @param {http.Server.IncomingMessage} request
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Object<string, boolean>} events
	 */
	_onRequest(request, response, session, events) {
		const { displayName } = this.accessory.info;

		debug(`[${displayName}] HAP Request: ${request.method} ${request.url}`);

		let dataBuffer = Buffer.alloc(0);
		request.on('data', data => dataBuffer = Buffer.concat([dataBuffer, data]));
		request.on('end', async () => {
			const requestData = new HAPRequestData(dataBuffer);

			// parse request.url (which can contain querystring, etc.)
			// into components, then extract just the path
			const { pathname } = new URL(request.url, 'http://' + request.headers.host);

			// all request data received; now process this request
			const handlerPath = Object.keys(HAPServer.handlers)
				.find(path => new RegExp('^' + path + '/?$').test(pathname));

			if (!handlerPath) { // nobody handled this? reply 404
				debug(`[${displayName}] WARNING: Handler for ${request.url} not implemented`);
				response.writeHead(404, "Not found", { 'Content-Type': 'text/html' }); b
				response.end();

				return;
			}

			// match exact string and allow trailing slash
			const handlerMethod = HAPServer.handlers[handlerPath];
			await this[handlerMethod](request, response, session, events, requestData);
		});
	}

	/**
	 * Unpaired Accessory identification.
	 *
	 * @param {http.Server.IncomingMessage} request
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Object<string, boolean>} events
	 * @param {HAPRequestData} requestData
	 */
	async _handleIdentify(request, response, session, events, requestData) {
		const isPaired = this.accessory.cache.isPaired();

		// identify only works if the accessory is not paired
		if (!this.allowInsecureRequest && isPaired) {
			response.writeHead(400, { "Content-Type": "application/hap+json" });
			response.end(JSON.stringify({ status: HAPServer.Status.INSUFFICIENT_PRIVILEGES }));

			return;
		}
		try {
			await this.accessory.handleIdentify(isPaired);

			debug("[%s] Identification success", this.accessory.info.displayName);
			response.writeHead(204);
			response.end();

		} catch (error) {
			debug("[%s] Identification error: %s", this.accessory.info.displayName, err.message);
			response.writeHead(500);
			response.end();
		}
	}

	/**
	 * iOS <-> Accessory pairing process.
	 *
	 * @param {http.Server.IncomingMessage} request
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Object<string, boolean>} events
	 * @param {HAPRequestData} requestData
	 */
	async _handlePair(request, response, session, events, requestData) {
		// Can only be directly paired with one iOS device
		if (!this.allowInsecureRequest && this.accessory.cache.isPaired()) {
			response.writeHead(403);
			response.end();

			return;
		}
		requestData = requestData.decode();

		if (requestData.sequenceNumber == 0x01) {
			this._handlePairStepOne(response, session);
		} else if (requestData.sequenceNumber == 0x03) {
			this._handlePairStepTwo(response, session, requestData);
		} else if (requestData.sequenceNumber == 0x05) {
			await this._handlePairStepThree(response, session, requestData);
		}
	}

	/**
	 * M1 + M2
	 * 
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 */
	_handlePairStepOne(response, session) {
		const { displayName, pincode } = this.accessory.info;
		debug(`[${displayName}] Pair step 1/5`);

		const salt = crypto.randomBytes(16);
		const srpParams = srp.params["3072"];

		srp.genKey(32, (error, key) => {
			// create a new SRP server
			const srpServer = new srp.Server(
				srpParams,
				Buffer.from(salt),
				Buffer.from("Pair-Setup"),
				Buffer.from(pincode),
				key
			);
			const srpB = srpServer.computeB();

			// attach it to the current TCP session
			session.srpServer = srpServer;

			response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
			response.end(tlv.encode({
				[HAPRequestData.Types.SEQUENCE_NUM]: 0x02,
				[HAPRequestData.Types.SALT]: salt,
				[HAPRequestData.Types.PUBLIC_KEY]: srpB
			}));
		});
	}

	/**
	 * M3 + M4
	 * 
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {HAPRequestData} requestData
	 */
	_handlePairStepTwo(response, session, requestData) {
		const { displayName } = this.accessory.info;
		const { publicKey, passwordProof } = requestData;

		debug(`[${displayName}] Pair step 2/5`);

		// pull the SRP server we created in stepOne out of the current session
		const srpServer = session.srpServer;
		srpServer.setA(publicKey);

		try {
			srpServer.checkM1(passwordProof);
		} catch (error) {
			// most likely the client supplied an incorrect pincode.
			debug(`[${displayName}] Error while checking pincode: ${error.message}`);

			response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
			response.end(tlv.encode({
				[HAPRequestData.Types.SEQUENCE_NUM]: 0x04,
				[HAPRequestData.Types.ERROR_CODE]: HAPServer.Codes.INVALID_REQUEST
			}));

			return;
		}

		// "M2 is the proof that the server actually knows your password."
		const M2 = srpServer.computeM2();

		response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
		response.end(tlv.encode({
			[HAPRequestData.Types.SEQUENCE_NUM]: 0x04,
			[HAPRequestData.Types.PASSWORD_PROOF]: M2
		}));
	}

	/**
	 * M5 - 1
	 * 
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {HAPRequestData} requestData
	 */
	async _handlePairStepThree(response, session, requestData) {
		debug(`[${this.accessory.info.displayName}] Pair step 3/5`);

		// pull the SRP server we created in stepOne out of the current session
		const { srpServer } = session;
		const { encryptedData } = requestData;

		const messageData = Buffer.alloc(encryptedData.length - 16);
		const authTagData = Buffer.alloc(16);

		encryptedData.copy(messageData, 0, 0, encryptedData.length - 16);
		encryptedData.copy(authTagData, 0, encryptedData.length - 16, encryptedData.length);

		const S_private = srpServer.computeK();
		const encSalt = Buffer.from("Pair-Setup-Encrypt-Salt");
		const encInfo = Buffer.from("Pair-Setup-Encrypt-Info");

		const outputKey = HKDF("sha512", encSalt, S_private, encInfo, 32);

		const plaintextBuffer = Buffer.alloc(messageData.length);
		encryption.verifyAndDecrypt(
			outputKey,
			Buffer.from("PS-Msg05"),
			messageData,
			authTagData,
			null,
			plaintextBuffer
		);

		// decode the client payload and pass it on to the next step
		const M5Packet = tlv.decode(plaintextBuffer);

		const clientUsername = M5Packet[HAPRequestData.Types.USERNAME];
		const clientLTPK = M5Packet[HAPRequestData.Types.PUBLIC_KEY];
		const clientProof = M5Packet[HAPRequestData.Types.PROOF];

		await this._handlePairStepFour(
			response, session, clientUsername, clientLTPK, clientProof, outputKey
		);
	}

	/**
	 * M5 - 2
	 * 
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Buffer} clientUsername
	 * @param {Buffer} clientLTPK
	 * @param {Buffer} clientProof
	 * @param {Buffer} hkdfEncKey
	 */
	async _handlePairStepFour(
		response,
		session,
		clientUsername,
		clientLTPK,
		clientProof,
		hkdfEncKey
	) {
		const { displayName } = this.accessory.info;
		debug(`[${displayName}] Pair step 4/5`);

		const S_private = session.srpServer.computeK();
		const controllerSalt = Buffer.from("Pair-Setup-Controller-Sign-Salt");
		const controllerInfo = Buffer.from("Pair-Setup-Controller-Sign-Info");
		const outputKey = HKDF("sha512", controllerSalt, S_private, controllerInfo, 32);

		const completeData = Buffer.concat([outputKey, clientUsername, clientLTPK]);

		if (!ed25519.Verify(completeData, clientProof, clientLTPK)) {
			debug(`[${displayName}] Invalid signature`);

			response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
			response.end(tlv.encode({
				[HAPServer.Types.SEQUENCE_NUM]: 0x06,
				[HAPServer.Types.ERROR_CODE]: HAPServer.Codes.INVALID_REQUEST
			}));

			return;
		}

		await this._handlePairStepFive(
			response, session, clientUsername, clientLTPK, hkdfEncKey
		);
	}

	/**
	 * M5 - F + M6
	 * 
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Buffer} clientUsername
	 * @param {Buffer} clientLTPK
	 * @param {Buffer} hkdfEncKey
	 */
	async _handlePairStepFive(response, session, clientUsername, clientLTPK, hkdfEncKey) {
		const { displayName, username } = this.accessory.info;
		const { privateKey, publicKey } = this.accessory.cache;

		debug(`[${displayName}] Pair step 5/5`);

		const S_private = session.srpServer.computeK();
		const accessorySalt = Buffer.from("Pair-Setup-Accessory-Sign-Salt");
		const accessoryInfo = Buffer.from("Pair-Setup-Accessory-Sign-Info");
		const outputKey = HKDF("sha512", accessorySalt, S_private, accessoryInfo, 32);

		const usernameData = Buffer.from(username);

		const material = Buffer.concat([outputKey, usernameData, publicKey]);
		const serverProof = ed25519.Sign(material, privateKey);

		const message = tlv.encode({
			[HAPRequestData.Types.USERNAME]: usernameData,
			[HAPRequestData.Types.PUBLIC_KEY]: publicKey,
			[HAPRequestData.Types.PROOF]: serverProof
		});

		const ciphertextBuffer = Buffer.alloc(message.length);
		const macBuffer = Buffer.alloc(16);
		encryption.encryptAndSeal(hkdfEncKey, Buffer.from("PS-Msg06"), message, null, ciphertextBuffer, macBuffer);

		try {
			await this.accessory.handlePair(clientUsername.toString(), clientLTPK);

			response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
			response.end(tlv.encode({
				[HAPServer.Types.SEQUENCE_NUM]: 0x06,
				[HAPServer.Types.ENCRYPTED_DATA]: Buffer.concat([ciphertextBuffer, macBuffer])
			}));

		} catch (error) {
			debug(`[${username}] Error adding pairing info: ${error.message}`);
			response.writeHead(500, "Server Error");
			response.end();
		}
	}

	/**
	 * iOS <-> Accessory pairing verification.
	 * 
	 * @param {http.Server.IncomingMessage} request
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Object<string, boolean>} events
	 * @param {HAPRequestData} requestData
	 */
	_handlePairVerify(request, response, session, events, requestData) {
		// Don't allow pair-verify without being paired first
		if (!this.allowInsecureRequest && !this.accessory.cache.isPaired()) {
			response.writeHead(403);
			response.end();

			return;
		}
		requestData = requestData.decode();

		if (requestData.sequenceNumber == 0x01) {
			this._handlePairVerifyStepOne(response, session, requestData);
		} else if (requestData.sequenceNumber == 0x03) {
			this._handlePairVerifyStepTwo(response, session, events, requestData);
		}
	}

	/**
	 * 
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {HAPRequestData} requestData
	 */
	_handlePairVerifyStepOne(response, session, requestData) {
		const { username, displayName } = this.accessory.info;
		const { privateKey } = this.accessory.cache;
		const { publicKey: clientPublicKey } = requestData;

		debug("[%s] Pair verify step 1/2", displayName);

		// generate new encryption keys for this session
		const secretKey = encryption.generateCurve25519SecretKey();
		const publicKey = encryption.generateCurve25519PublicKeyFromSecretKey(secretKey);
		const sharedSec = encryption.generateCurve25519SharedSecKey(secretKey, clientPublicKey);

		const usernameData = Buffer.from(username);
		const material = Buffer.concat([publicKey, usernameData, clientPublicKey]);
		const serverProof = ed25519.Sign(material, privateKey);

		const encSalt = Buffer.from("Pair-Verify-Encrypt-Salt");
		const encInfo = Buffer.from("Pair-Verify-Encrypt-Info");

		const outputKey = HKDF("sha512", encSalt, sharedSec, encInfo, 32)
			.slice(0, 32);

		// store keys in a new instance of HAPEncryption
		const enc = new HAPEncryption();
		enc.clientPublicKey = clientPublicKey;
		enc.secretKey = secretKey;
		enc.publicKey = publicKey;
		enc.sharedSec = sharedSec;
		enc.hkdfPairEncKey = outputKey;

		// store this in the current TCP session
		session.encryption = enc;

		// compose the response data in TLV format
		const message = tlv.encode({
			[HAPRequestData.Types.USERNAME]: usernameData,
			[HAPRequestData.Types.PROOF]: serverProof
		});

		// encrypt the response
		const ciphertextBuffer = Buffer.alloc(message.length);
		const macBuffer = Buffer.alloc(16);
		encryption.encryptAndSeal(
			outputKey, Buffer.from("PV-Msg02"), message, null, ciphertextBuffer, macBuffer
		);

		response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
		response.end(tlv.encode({
			[HAPRequestData.Types.SEQUENCE_NUM]: 0x02,
			[HAPRequestData.Types.ENCRYPTED_DATA]: Buffer.concat([ciphertextBuffer, macBuffer]),
			[HAPRequestData.Types.PUBLIC_KEY]: publicKey
		}));
	}

	/**
	 * 
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Object<string, boolean>} events
	 * @param {HAPRequestData} requestData
	 */
	_handlePairVerifyStepTwo(response, session, events, requestData) {
		const { displayName }  = this.accessory.info;
		const { encryptedData } = requestData;

		debug("[%s] Pair verify step 2/2", displayName);

		const messageData = Buffer.alloc(encryptedData.length - 16);
		const authTagData = Buffer.alloc(16);
		encryptedData.copy(messageData, 0, 0, encryptedData.length - 16);
		encryptedData.copy(authTagData, 0, encryptedData.length - 16, encryptedData.length);

		const plaintextBuffer = Buffer.alloc(messageData.length);

		// instance of HAPEncryption (created in handlePairVerifyStepOne)
		const enc = session.encryption;

		if (!encryption.verifyAndDecrypt(
			enc.hkdfPairEncKey, Buffer.from("PV-Msg03"), messageData, authTagData, null, plaintextBuffer
		)) {
			debug("[%s] M3: Invalid signature", displayName);

			response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
			response.end(tlv.encode({
				[HAPRequestData.Types.ERROR_CODE]: HAPServer.Codes.INVALID_REQUEST
			}));

			return;
		}

		const decoded = tlv.decode(plaintextBuffer);
		const clientUsername = decoded[HAPRequestData.Types.USERNAME];
		const proof = decoded[HAPRequestData.Types.PROOF];

		const material = Buffer.concat([enc.clientPublicKey, clientUsername, enc.publicKey]);

		// since we're paired, we should have the public key stored for this client
		const clientPublicKey = this.accessory.cache.getClientPublicKey(
			clientUsername.toString()
		);

		// if we're not actually paired, then there's nothing to verify - this client thinks it's paired with us but we
		// disagree. Respond with invalid request (seems to match HomeKit Accessory Simulator behavior)
		if (!clientPublicKey) {
			debug("[%s] Client %s attempting to verify, but we are not paired; rejecting client", username, clientUsername);

			response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
			response.end(tlv.encode({
				[HAPRequestData.Types.ERROR_CODE]: HAPServer.Codes.INVALID_REQUEST
			}));

			return;
		}

		if (!ed25519.Verify(material, proof, clientPublicKey)) {
			debug("[%s] Client %s provided an invalid signature", username, clientUsername);

			response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
			response.end(tlv.encode({
				[HAPRequestData.Types.ERROR_CODE]: HAPServer.Codes.INVALID_REQUEST
			}));

			return;
		}

		debug(`[${displayName}] Client ${clientUsername} verification complete`);

		response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
		response.end(tlv.encode({
			[HAPRequestData.Types.SEQUENCE_NUM]: 0x04
		}));

		// now that the client has been verified, we must "upgrade" our pesudo-HTTP connection to include
		// TCP-level encryption. We'll do this by adding some more encryption vars to the session, and using them
		// in future calls to onEncrypt, onDecrypt.

		const encSalt = Buffer.from("Control-Salt");
		const infoRead = Buffer.from("Control-Read-Encryption-Key");
		const infoWrite = Buffer.from("Control-Write-Encryption-Key");

		enc.accessoryToControllerKey = HKDF("sha512", encSalt, enc.sharedSec, infoRead, 32);
		enc.controllerToAccessoryKey = HKDF("sha512", encSalt, enc.sharedSec, infoWrite, 32);

		// Our connection is now completely setup. We now want to subscribe this connection to special
		// "keepalive" events for detecting when connections are closed by the client.
		events['keepalive'] = true;
	}

	/**
	 * Pair add/remove
	 * 
	 * @param {http.Server.IncomingMessage} request
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Object<string, boolean>} events
	 * @param {HAPRequestData} requestData
	 */
	async _handlePairings(request, response, session, events, requestData) {

		// Only accept /pairing request if there is a secure session
		if (this._isInsecureRequest(request, session)) {
			response.writeHead(401, { "Content-Type": "application/hap+json" });
			response.end(JSON.stringify({ status: HAPServer.Status.INSUFFICIENT_PRIVILEGES }));

			return;
		}
		const { displayName } = this.accessory.info;
		const { requestType, username: clientUsername, publicKey } = requestData.decode();

		if (requestType == 3) {
			// technically we're already paired and communicating securely if the client is able to call /pairings at all!
			// but maybe the client wants to change their public key? so we'll emit 'pair' like we just paired again
			debug("[%s] Adding pairing info for client", displayName);

			try {
				await this.accessory.handlePair(clientUsername.toString(), publicKey);

				response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
				response.end(tlv.encode({
					[HAPRequestData.Types.SEQUENCE_NUM]: 0x02
				}));

			} catch (error) {
				debug("[%s] Error adding pairing info: %s", displayName, error.message);
				response.writeHead(500, "Server Error");
				response.end();
			}
		} else if (requestType == 4) {

			debug("[%s] Removing pairing info for client", displayName);

			try {
				await this.accessory.handleUnpair(clientUsername.toString());

				response.writeHead(200, { "Content-Type": "application/pairing+tlv8" });
				response.end(tlv.encode({
					[HAPRequestData.Types.SEQUENCE_NUM]: 0x02
				}));

			} catch (error) {
				debug("[%s] Error removing pairing info: %s", displayName, error.message);
				response.writeHead(500, "Server Error");
				response.end();
			}
		}
	}

	/**
	 * Called when the client wishes to fetch all data regarding our published Accessories.
	 *
	 * @param {http.Server.IncomingMessage} request
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Object<string, boolean>} events
	 * @param {HAPRequestData} requestData
	 */
	async _handleAccessories(request, response, session, events, requestData) {
		if (this._isInsecureRequest(request, session)) {
			response.writeHead(401, { "Content-Type": "application/hap+json" });
			response.end(JSON.stringify({ status: HAPServer.Status.INSUFFICIENT_PRIVILEGES }));

			return;
		}
		try {
			const accessories = await this.accessory.handleGetInfo();

			response.writeHead(200, { "Content-Type": "application/hap+json" });
			response.end(JSON.stringify(accessories));

		} catch (error) {
			debug("[%s] Error getting accessories: %s", this.accessory.info.displayName, error.message);
			response.writeHead(500, "Server Error");
			response.end();
		}
	}

	/**
	 * Called when the client wishes to get or set particular characteristics
	 *
	 * @param {http.Server.IncomingMessage} request
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Object<string, boolean>} events
	 * @param {HAPRequestData} requestData
	 */
	async _handleCharacteristics(request, response, session, events, requestData) {
		if (this._isInsecureRequest(request, session)) {
			response.writeHead(401, { "Content-Type": "application/hap+json" });
			response.end(JSON.stringify({ status: HAPServer.Status.INSUFFICIENT_PRIVILEGES }));

			return;
		}

		let characteristics, dataSets = [];

		try {
			if (request.method === "GET") {
				// Extract the query params from the URL which looks like: /characteristics?id=1.9,2.14,...
				const { searchParams } = new URL(request.url, 'http://' + request.headers.host);

				if (!searchParams.has('id')) {
					response.writeHead(500);
					response.end();
					return;
				}
				dataSets = searchParams.get('id').split(',').map(set => {
					const [aid, iid] = set.split('.').map(id => parseInt(id)); // [1, 9]
					return { aid, iid };
				}); // [{ aid: 1, iid: 9 },{ aid: 2, iid: 14 }]

				characteristics = await this.accessory.handleGetCharacteristics(dataSets, events, session.sessionID);

				if (!characteristics) {
					throw new Error('Characteristics not supplied by the \'handleGetCharacteristics\' method.')
				}
			} else if (request.method === "PUT") {
				if (!this._isAuthorized(request, session)) {
					response.writeHead(401, { "Content-Type": "application/hap+json" });
					response.end(JSON.stringify({ status: HAPServer.Status.INSUFFICIENT_PRIVILEGES }));

					return;
				}
				if (requestData.length == 0) {
					response.writeHead(400, { "Content-Type": "application/hap+json" });
					response.end(JSON.stringify({ status: HAPServer.Status.INVALID_VALUE_IN_REQUEST }));

					return;
				}
				// requestData is a JSON payload like { characteristics: [ { aid: 1, iid: 8, value: true, ev: true } ] }
				dataSets = JSON.parse(requestData.toString()).characteristics; // pull out characteristics array

				characteristics = await this.accessory.handleSetCharacteristics(dataSets, events, session.sessionID);
			}
		} catch (error) {
			debug("[%s] Error getting characteristics: %s", this.accessory.info.displayName, error.stack);

			// rewrite characteristics array to include error status for each characteristic requested
			characteristics = dataSets.map(set => {
				set.status = HAPServer.Status.SERVICE_COMMUNICATION_FAILURE;
			});
		} finally {
			// 207 is "multi-status" since HomeKit may be requesting multiple things and any one can fail independently
			response.writeHead(207, { "Content-Type": "application/hap+json" });
			response.end(JSON.stringify({ characteristics }));
		}
	}

	/**
	 * Called when controller request snapshot
	 *
	 * @param {http.Server.IncomingMessage} request
	 * @param {http.Server.ServerResponse} response
	 * @param {{ sessionID: string }} session
	 * @param {Object<string, boolean>} events
	 * @param {HAPRequestData} requestData
	 */
	async _handleResource(request, response, session, events, requestData) {
		if (
			this._isInsecureRequest(request, session) ||
			!this._isAuthorized(request, session)
		) {
			response.writeHead(401, { "Content-Type": "application/hap+json" });
			response.end(JSON.stringify({ status: HAPServer.Status.INSUFFICIENT_PRIVILEGES }));

			return;
		}

		if (requestData.length == 0) {
			response.writeHead(400, { "Content-Type": "application/hap+json" });
			response.end(JSON.stringify({ status: HAPServer.Status.INVALID_VALUE_IN_REQUEST }));

			return;
		}

		if (typeof this.handleResourceRequest !== 'function' || request.method !== "POST") {
			response.writeHead(405);
			response.end();

			return;
		}

		const data = JSON.parse(requestData.toString());

		try {
			const resource = await this.accessory.handleResourceRequest(data);

			response.writeHead(200, { "Content-Type": "image/jpeg" });
			response.end(resource);

		} catch (error) {
			debug("[%s] Error getting snapshot: %s", this.accessory.info.displayName, error.message);

			response.writeHead(500);
			response.end();
		}
	}

	/**
	 * Send out a "keepalive" event which all connections automatically sign up
	 * for once pairVerify is completed. The event contains no actual data, so
	 * iOS devices will simply ignore it.
	 */
	_onKeepAliveTimerTick() {
		this.notifyClients('keepalive', { characteristics: [] });
	}

	/**
	 * Propagates event to all active connections
	 * 
	 * @param {String} event 
	 * @param {Object} data 
	 * @param {String} contentType 
	 * @param {Object} exclude 
	 */
	_sendEventToActiveConnections(event, data, contentType, exclude) {
		this._connections.forEach(
			connection => connection.sendEvent(event, data, contentType, exclude)
		);
	}

	/**
	 * Returns true if the client communicates via encrypted channel or the
	 * authorization header matches the accessory pincode
	 *
	 * @param {http.Server.IncomingMessage} request
	 * @param {{ sessionID: string }} session
	 * @returns {boolean}
	 */
	_isAuthorized(request, session) {
		if (!session.encryption) {
			return (
				!request.headers ||
				(request.headers && request.headers["authorization"] !== this._accessoryInfo.pincode)
			);
		}

		return true;
	}

	/**
	 * Returns true if the incoming request is insecure and we don't allow
	 * processing of insecure requests.
	 *
	 * @param {http.Server.IncomingMessage} request
	 * @param {{ sessionID: string }} session
	 * @returns {boolean}
	 */
	_isInsecureRequest(request, session) {
		return !session.encryption && !this.allowInsecureRequest;
	}
}

HAPServer.handlers = {
	'/identify': '_handleIdentify',
	'/pair-setup': '_handlePair',
	'/pair-verify': '_handlePairVerify',
	'/pairings': '_handlePairings',
	'/accessories': '_handleAccessories',
	'/characteristics': '_handleCharacteristics',
	'/resource': '_handleResource'
};

// Various "type" constants for HAP's TLV encoding.
HAPServer.Types = {
	REQUEST_TYPE: 0x00,
	USERNAME: 0x01,
	SALT: 0x02,
	PUBLIC_KEY: 0x03,
	PASSWORD_PROOF: 0x04,
	ENCRYPTED_DATA: 0x05,
	SEQUENCE_NUM: 0x06,
	ERROR_CODE: 0x07,
	PROOF: 0x0a
};

// Error codes and the like, guessed by packet inspection
HAPServer.Codes = {
	INVALID_REQUEST: 0x02,
	INVALID_SIGNATURE: 0x04
};

// Status codes for underlying HAP calls
HAPServer.Status = {
	SUCCESS: 0,
	INSUFFICIENT_PRIVILEGES: -70401,
	SERVICE_COMMUNICATION_FAILURE: -70402,
	RESOURCE_BUSY: -70403,
	READ_ONLY_CHARACTERISTIC: -70404,
	WRITE_ONLY_CHARACTERISTIC: -70405,
	NOTIFICATION_NOT_SUPPORTED: -70406,
	OUT_OF_RESOURCE: -70407,
	OPERATION_TIMED_OUT: -70408,
	RESOURCE_DOES_NOT_EXIST: -70409,
	INVALID_VALUE_IN_REQUEST: -70410
};

/**
 * Simple struct to hold vars needed to support HAP encryption.
 */

function HAPEncryption() {
	// initialize member vars with null-object values
	this.clientPublicKey = Buffer.alloc(0);
	this.secretKey = Buffer.alloc(0);
	this.publicKey = Buffer.alloc(0);
	this.sharedSec = Buffer.alloc(0);
	this.hkdfPairEncKey = Buffer.alloc(0);
	this.accessoryToControllerCount = { value: 0 };
	this.controllerToAccessoryCount = { value: 0 };
	this.accessoryToControllerKey = Buffer.alloc(0);
	this.controllerToAccessoryKey = Buffer.alloc(0);
	this.extraInfo = {};
}

module.exports = HAPServer;
