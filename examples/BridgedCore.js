const {  Accessory, Bridge } = require('../index');
const uuid = require('uuid/v3');

// Start by creating our Bridge which will host all loaded Accessories
const bridge = new Bridge(uuid("hap.bridge", uuid.DNS), {
	displayName: "Accessory Bridge",
	pincode: "123-44-567",
	username: "2A:8F:14:9A:5E:97",
	category: Accessory.Categories.Bridge
});

// Listen for bridge identification event
bridge.on('identify', async isPaired => {
	console.log("Node Bridge identify");
});

// Load all accessories in the /accessories folder
const accessories = Accessory.load(__dirname + '/accessories/*_accessory.js');

if (accessories.length === 0) {
	console.log('No accessories found.');
}

// Add them all to the bridge
accessories.forEach(accessory => {
	bridge.addBridgedAccessory(accessory);
});

// Publish the Bridge on the local network.
bridge.publish();