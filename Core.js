const Accessory = require('./src/Accessory');

// Our Accessories will each have their own HAP server; we will assign ports sequentially
let targetPort = 51828;
// Load all accessories in the /accessories folder
const accessories = Accessory.load('examples/*_accessory.js');

if (accessories.length === 0) {
	console.log('No accessories found. Exiting.');
}

// Publish them all separately (as opposed to BridgedCore which publishes them behind a single Bridge accessory)
accessories.forEach(accessory => {

	// To push Accessories separately, we'll need a few extra properties
	if (!accessory.info.username) {
		throw new Error(
			`Username not found on accessory '${accessory.displayName}'.` +
			`All accessories are required to define a unique 'username' property.`
		);
	}

	if (!accessory.info.pincode) {
		throw new Error(
			`Pincode not found on accessory '${accessory.displayName}'.` +
			`All accessories are required to define a unique 'pincode' property.`
		);
	}

	// publish this Accessory on the local network
	accessory.publish({
		port: targetPort++
	});
});



