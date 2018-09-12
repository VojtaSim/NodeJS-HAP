const Accessory = require('./src/Accessory');
const Bridge = require('./src/Bridge');
const Camera = require('./src/Camera');
const Service = require('./src/Service');
const Characteristic = require('./src/Characteristic');
const StreamController = require('./src/StreamController');
const HAPServer = require('./src/HAPServer');

// ensure Characteristic subclasses are defined
const HomeKitTypes = require('./lib/gen/HomeKitTypes');

module.exports = {
  Accessory,
  Bridge,
  Camera,
  Service,
  Characteristic,
  AccessoryLoader,
  StreamController,
  HAPServer
}
