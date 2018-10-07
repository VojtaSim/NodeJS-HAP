const Accessory = require('./src/Accessory');
const Bridge = require('./src/Bridge');
const CameraAccessory = require('./src/CameraAccessory');
const Service = require('./src/Service');
const Characteristic = require('./src/Characteristic');
const StreamController = require('./src/camera/StreamController');
const HAPServer = require('./src/server/HAPServer');

// ensure Characteristic subclasses are defined
const HomeKitCharacteristics = require('./generated/HomeKitCharacteristics');
const HomeKitServices = require('./generated/HomeKitServices');

module.exports = {
  Accessory,
  Bridge,
  CameraAccessory,
  Service,
  Characteristic,
  StreamController,
  HAPServer
}
