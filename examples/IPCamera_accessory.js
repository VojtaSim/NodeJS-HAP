const { CameraAccessory, Service, Characteristic } = require('../index');
const uuid = require('uuid/v3');

const cameraUUID = uuid('hap.accessories.camera', uuid.DNS);
const cameraAccessory = module.exports = new CameraAccessory(
	cameraUUID,
	{
		displayName: "IP Camera", //name of accessory
		pincode: "123-44-567",
		username: "4D:5B:1C:6C:1F:7B",
		category: CameraAccessory.Categories.IP_CAMERA
	},
	{
		source: '-f avfoundation -s 1280x720 -framerate 30 -pixel_format yuyv422 -i "0"',
		streams: 2,
		audioEnabled: false
	}
);

// set some basic properties (these values are arbitrary and setting them is optional)
cameraAccessory
	.getService(Service.AccessoryInformation)
	.setCharacteristicValue(Characteristic.Manufacturer, "HAP-Node.js")
	.setCharacteristicValue(Characteristic.Model, "v1.2")
	.setCharacteristicValue(Characteristic.SerialNumber, "A12S345KGB");

// listen for the "identify" event for this Accessory
cameraAccessory.on('identify', async isPaired => {
	console.log('Identify Camera');
});
