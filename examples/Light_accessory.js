const { Accessory, Service, Characteristic } = require('../index');
const uuid = require('uuid/v3');

const LightController = {
	 // MAC like address used by HomeKit to differentiate accessories.
	name: "Simple Light",
	manufacturer: "HAP-NodeJS", //manufacturer (optional)
	model: "v1.0", //model (optional)
	serialNumber: "A12S345KGB", //serial number (optional)

	power: false, //current power status
	brightness: 100, //current brightness
	hue: 0, //current hue
	saturation: 0, //current saturation

	outputLogs: true, //output logs

	setPower: function (status) { //set power of accessory
		if (this.outputLogs) console.log("Turning the '%s' %s", this.name, status ? "on" : "off");
		this.power = status;
	},

	getPower: function () { //get power of accessory
		if (this.outputLogs) console.log("'%s' is %s.", this.name, this.power ? "on" : "off");
		return this.power;
	},

	setBrightness: function (brightness) { //set brightness
		if (this.outputLogs) console.log("Setting '%s' brightness to %s", this.name, brightness);
		this.brightness = brightness;
	},

	getBrightness: function () { //get brightness
		if (this.outputLogs) console.log("'%s' brightness is %s", this.name, this.brightness);
		return this.brightness;
	},

	setSaturation: function (saturation) { //set brightness
		if (this.outputLogs) console.log("Setting '%s' saturation to %s", this.name, saturation);
		this.saturation = saturation;
	},

	getSaturation: function () { //get brightness
		if (this.outputLogs) console.log("'%s' saturation is %s", this.name, this.saturation);
		return this.saturation;
	},

	setHue: function (hue) { //set brightness
		if (this.outputLogs) console.log("Setting '%s' hue to %s", this.name, hue);
		this.hue = hue;
	},

	getHue: function () { //get hue
		if (this.outputLogs) console.log("'%s' hue is %s", this.name, this.hue);
		return this.hue;
	},

	identify: function () { //identify the accessory
		if (this.outputLogs) console.log("Identify the '%s'", this.name);
	}
}

// Generate a consistent UUID for our light Accessory that will remain the same even when
// restarting our server. We use the `uuid.generate` helper function to create a deterministic
// UUID based on an arbitrary "namespace" and the word "light".
const lightUUID = uuid('hap.accessories.lightbulb', uuid.DNS);

// This is the Accessory that we'll return to HAP-NodeJS that represents our light.
const lightAccessory = module.exports = new Accessory(
	lightUUID,
	{
		displayName: "Simple Light", //name of accessory
		pincode: "123-44-567",
		username: "3C:2A:8D:4B:3D:5B",
		category: Accessory.Categories.LIGHTBULB
	}
);

// set some basic properties (these values are arbitrary and setting them is optional)
lightAccessory
	.getService(Service.AccessoryInformation)
	.setCharacteristicValue(Characteristic.Manufacturer, LightController.manufacturer)
	.setCharacteristicValue(Characteristic.Model, LightController.model)
	.setCharacteristicValue(Characteristic.SerialNumber, LightController.serialNumber);

// listen for the "identify" event for this Accessory
lightAccessory.on('identify', async isPaired => {
	LightController.identify();
});

// Add the actual Lightbulb Service and listen for change events from iOS.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
lightAccessory
	.addService(Service.Lightbulb, LightController.name) // services exposed to the user should have "names" like "Light" for this case
	.getCharacteristic(Characteristic.On)
	.onGet(async () => LightController.getPower())
	.onSet(async value => LightController.setPower(value));

// To inform HomeKit about changes occurred outside of HomeKit (like user physically turn on the light)
// Please use Characteristic.updateValue
// 
// lightAccessory
//   .getService(Service.Lightbulb)
//   .getCharacteristic(Characteristic.On)
//   .updateValue(true);

// also add an "optional" Characteristic for Brightness
lightAccessory
	.getService(Service.Lightbulb)
	.addCharacteristic(Characteristic.Brightness)
	.onGet(async () => LightController.getBrightness())
	.onSet(async value => LightController.setBrightness(value));

// also add an "optional" Characteristic for Saturation
lightAccessory
	.getService(Service.Lightbulb)
	.addCharacteristic(Characteristic.Saturation)
	.onGet(async () => LightController.getSaturation())
	.onSet(async value => LightController.setSaturation(value));

// also add an "optional" Characteristic for Hue
lightAccessory
	.getService(Service.Lightbulb)
	.addCharacteristic(Characteristic.Hue)
	.onGet(async () => LightController.getHue())
	.onSet(async value => LightController.setHue(value));
