'use strict';

const debug = require('debug')('HAPConnection');
const EventEmitter = require('events');
const net = require('net');
const http = require('http');
const uuid = require('uuid/v5');
const encryption = require('../encryption/encryption');

/**
 * Manages a single iOS-initiated HTTP connection during its lifetime.
 *
 * @event 'request' => function(request, response) { }
 * @event 'close' => function() { }
 */
class HAPConnection extends EventEmitter {

	constructor(clientSocket) {
		super();

		this.sessionID = uuid(clientSocket.remoteAddress + ':' + clientSocket.remotePort, uuid.URL);

		this._remoteAddress = clientSocket.remoteAddress; // cache because it becomes undefined in 'onClientSocketClose'
		this._pendingClientSocketData = Buffer.alloc(0); // data received from client before HTTP proxy is fully setup
		this._fullySetup = false; // true when we are finished establishing connections
		this._writingResponse = false; // true while we are composing an HTTP response (so events can wait)
		this._pendingEventData = Buffer.alloc(0); // event data waiting to be sent until after an in-progress HTTP response is being written

		// clientSocket is the socket connected to the actual iOS device
		this._clientSocket = clientSocket;
		this._clientSocket.on('data', (data) => this._onClientSocketData(data));
		this._clientSocket.on('error', (error) => this._onClientSocketError(error)); // we MUST register for this event, otherwise the error will bubble up to the top and crash the node process entirely.
		this._clientSocket.on('close', () => this._onClientSocketClose());

		// serverSocket is our connection to our own internal httpServer
		this._serverSocket = null; // created after httpServer 'listening' event

		// create our internal HTTP server for this connection that we will proxy data to and from
		this._httpServer = http.createServer();

		this._httpServer.timeout = 0; // clients expect to hold connections open as long as they want
		this._httpServer.keepAliveTimeout = 0; // workaround for https://github.com/nodejs/node/issues/13391
		this._httpServer.on('listening', () => this._onHttpServerListening());
		this._httpServer.on('request', (request, response) => this._onHttpServerRequest(request, response));
		this._httpServer.on('error', (error) => this._onHttpServerError(error));
		this._httpServer.listen(0);

		// an arbitrary dict that users of this class can store values in to associate with this particular connection
		this._session = {
			sessionID: this.sessionID
		};

		// a collection of event names subscribed to by this connection
		this._events = {}; // this._events[eventName] = true (value is arbitrary, but must be truthy)

		debug("[%s] New connection from client", this._remoteAddress);
	}

	sendEvent(event, data, contentType, excludeEvents) {

		// has this connection subscribed to the given event? if not, nothing to do!
		if (!this._events[event]) {
			return;
		}

		// does this connection's 'events' object match the excludeEvents object? if so, don't send the event.
		if (excludeEvents === this._events) {
			debug("[%s] Muting event '%s' notification for this connection since it originated here.", this._remoteAddress, event);
			return;
		}

		debug("[%s] Sending HTTP event '%s' with data: %s", this._remoteAddress, event, data.toString('utf8'));

		// ensure data is a Buffer
		data = Buffer.from(data);

		// format this payload as an HTTP response
		const linebreak = Buffer.from("0D0A", "hex");
		data = Buffer.concat([
			Buffer.from('EVENT/1.0 200 OK'), linebreak,
			Buffer.from('Content-Type: ' + contentType), linebreak,
			Buffer.from('Content-Length: ' + data.length), linebreak,
			linebreak,
			data
		]);

		// try to encrypt this data before sending it to the client
		const encryptedData = this._encrypt(data);

		if (encryptedData) {
			data = encryptedData;
		}

		// if we're in the middle of writing an HTTP response already, put this event in the queue for when
		// we're done. otherwise send it immediately.
		if (this._writingResponse) {
			this._pendingEventData = Buffer.concat([this._pendingEventData, data]);
		} else {
			this._clientSocket.write(data);
		}
	}

	_sendPendingEvents() {

		// an existing HTTP response was finished, so let's flush our pending event buffer if necessary!
		if (this._pendingEventData.length > 0) {
			debug("[%s] Writing pending HTTP event data", this._remoteAddress);
			this._clientSocket.write(this._pendingEventData);
		}

		// clear the buffer
		this._pendingEventData = Buffer.alloc(0);
	}

	// Received data from client (iOS)
	_onClientSocketData(data) {
		const decryptedData = this._decrypt(data, this._session);

		if (decryptedData) {
			data = decryptedData;
		}
		if (this._fullySetup) {
			// proxy it along to the HTTP server
			this._serverSocket.write(data);
		}
		else {
			// we're not setup yet, so add this data to our buffer
			this._pendingClientSocketData = Buffer.concat([this._pendingClientSocketData, data]);
		}
	}

	_onClientSocketClose() {
		debug("[%s] Client connection closed", this._remoteAddress);

		// shutdown the other side
		this._serverSocket.destroy();
	}

	_onClientSocketError(error) {
		debug("[%s] Client connection error: %s", this._remoteAddress, error.message);

		// _onClientSocketClose will be called next
	}

	// Called only once right after constructor finishes
	_onHttpServerListening() {
		this._httpPort = this._httpServer.address().port;
		debug("[%s] HTTP server listening on port %s", this._remoteAddress, this._httpPort);

		// closes before this are due to retrying listening, which don't need to be handled
		this._httpServer.on('close', this._onHttpServerClose.bind(this));

		// now we can establish a connection to this running HTTP server for proxying data
		this._serverSocket = net.createConnection(this._httpPort);
		this._serverSocket.on('connect', () => this._onServerSocketConnect());
		this._serverSocket.on('data', (data) => this._onServerSocketData(data));
		this._serverSocket.on('error', (error) => this._onServerSocketError(error)); // we MUST register for this event, otherwise the error will bubble up to the top and crash the node process entirely.
		this._serverSocket.on('close', () => this._onServerSocketClose());
	}

	// Called only once right after onHttpServerListening
	_onServerSocketConnect() {

		// we are now fully set up:
		//  - clientSocket is connected to the iOS device
		//  - serverSocket is connected to the httpServer
		//  - ready to proxy data!
		this._fullySetup = true;

		// start by flushing any pending buffered data received from the client while we were setting up
		if (this._pendingClientSocketData.length > 0) {
			this._serverSocket.write(this._pendingClientSocketData);
			this._pendingClientSocketData = null;
		}
	}

	// Received data from HTTP Server
	_onServerSocketData(data) {

		// try to encrypt this data before sending it to the client
		const encryptedData = this._encrypt(data, this._session);

		if (encryptedData) {
			data = encryptedData;
		}

		// proxy it along to the client (iOS)
		this._clientSocket.write(data);
	}

	// Our internal HTTP Server has been closed (happens after we call this._httpServer.close() below)
	_onServerSocketClose() {
		debug("[%s] HTTP connection was closed", this._remoteAddress);

		// make sure the iOS side is closed as well
		this._clientSocket.destroy();

		// we only support a single long-lived connection to our internal HTTP server. Since it's closed,
		// we'll need to shut it down entirely.
		this._httpServer.close();
	}

	// Our internal HTTP Server has been closed (happens after we call this._httpServer.close() below)
	_onServerSocketError(error) {
		debug("[%s] HTTP connection error: ", this._remoteAddress, error.message);

		// _onServerSocketClose will be called next
	}

	_onHttpServerRequest(request, response) {
		debug("[%s] HTTP request: %s", this._remoteAddress, request.url);

		this._writingResponse = true;

		// sign up to know when the response is ended, so we can safely send EVENT responses
		response.on('finish', () => {
			debug("[%s] HTTP Response is finished", this._remoteAddress);

			this._writingResponse = false;
			this._sendPendingEvents();
		});

		// pass it along to listeners
		this.emit('request', request, response, this._session, this._events);
	}

	_onHttpServerClose() {
		debug("[%s] HTTP server was closed", this._remoteAddress);

		// notify listeners that we are completely closed
		this.emit('close', this._events);
	}

	_onHttpServerError(error) {
		debug("[%s] HTTP server error: %s", this._remoteAddress, error.message);

		if (error.code === 'EADDRINUSE') {
			this._httpServer.close();
			this._httpServer.listen(0);
		}
	}

	_encrypt(data, session) {

		// instance of HAPEncryption (created in handlePairVerifyStepOne)
		const enc = session.encryption;

		// if accessoryToControllerKey is not empty, then encryption is enabled for this connection. However, we'll
		// need to be careful to ensure that we don't encrypt the last few bytes of the response from handlePairVerifyStepTwo.
		// Since all communication calls are asynchronous, we could easily receive this 'encrypt' event for those bytes.
		// So we want to make sure that we aren't encrypting data until we have *received* some encrypted data from the
		// client first.
		if (enc && enc.accessoryToControllerKey.length > 0 && enc.controllerToAccessoryCount.value > 0) {
			return encryption.layerEncrypt(data, enc.accessoryToControllerCount, enc.accessoryToControllerKey);
		}
	}

	_decrypt(data, session) {

		// possibly an instance of HAPEncryption (created in handlePairVerifyStepOne)
		const enc = session.encryption;

		// if controllerToAccessoryKey is not empty, then encryption is enabled for this connection.
		if (enc && enc.controllerToAccessoryKey.length > 0) {
			return encryption.layerDecrypt(data, enc.controllerToAccessoryCount, enc.controllerToAccessoryKey, enc.extraInfo);
		}
	}
}

module.exports = HAPConnection;
