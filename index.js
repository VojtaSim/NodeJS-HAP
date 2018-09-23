const Accessory = require('./src/Accessory');
const Bridge = require('./src/Bridge');
//const Camera = require('./src/Camera');
const Service = require('./src/Service');
const Characteristic = require('./src/Characteristic');
//const StreamController = require('./src/StreamController');
const HAPServer = require('./src/server/HAPServer');

// ensure Characteristic subclasses are defined
const HomeKitCharacteristics = require('./generated/HomeKitCharacteristics');
const HomeKitServices = require('./generated/HomeKitServices');

module.exports = {
  Accessory,
  Bridge,
  //Camera,
  Service,
  Characteristic,
  //StreamController,
  HAPServer
}
