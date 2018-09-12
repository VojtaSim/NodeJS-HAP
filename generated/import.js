'use strict';

const path = require('path');
const fs = require('fs');
const plist = require('simple-plist');
const Characteristic = require('../Characteristic');

/**
 * This module is intended to be run from the command line. It is a script that extracts Apple's Service
 * and Characteristic UUIDs and structures from Apple's own HomeKit Accessory Simulator app.
 */

// assumed location of the plist we need (might want to make this a command-line argument at some point)
const plistPath = '/Applications/HomeKit Accessory Simulator.app/Contents/Frameworks/HAPAccessoryKit.framework/Versions/A/Resources/default.metadata.plist';
const metadata = plist.readFileSync(plistPath);

// begin writing the output file
const outputPath = path.join(__dirname, 'HomeKitTypes.js');
const output = fs.createWriteStream(outputPath);

output.write("// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY\n");
output.write("\n");
output.write("const Characteristic = require('../Characteristic');\n");
output.write("const Service = require('../Service');\n");
output.write("\n");

/**
 * Characteristics
 */

// index Characteristics for quick access while building Services
const characteristics = {}; // characteristics[UUID] = classyName

metadata.Characteristics.forEach(characteristic => {
	const classyName = characteristic.Name
		.replace(/[\s\-]/g, "") // "Target Door State" -> "TargetDoorState"
		.replace(/[.]/g, "_"); // "PM2.5" -> "PM2_5"

	// index classyName for when we want to declare these in Services below
	characteristics[characteristic.UUID] = classyName;

	output.write(`/**\n * Characteristic "${characteristic.Name}"\n */\n\n`);
	output.write(`class ${classyName} extends Characteristic {\n`);
	output.write('	constructor() {\n');
	output.write(`		super('${characteristic.Name}', '${characteristic.UUID}', {\n`);

	// apply Characteristic properties
	output.write(`			format: Characteristic.Formats.${getCharacteristicFormatsKey(characteristic.Format)}`);

	// special unit type?
	if (characteristic.Unit) {
		output.write(`,\n			unit: Characteristic.Units.${getCharacteristicUnitsKey(characteristic.Unit)}`);
	}
	if (characteristic.Constraints && typeof characteristic.Constraints.MaximumValue !== 'undefined') {
		output.write(`,\n			maxValue: ${characteristic.Constraints.MaximumValue}`);
	}
	if (characteristic.Constraints && typeof characteristic.Constraints.MinimumValue !== 'undefined') {
		output.write(`,\n			minValue: ${characteristic.Constraints.MinimumValue}`);
	}
	if (characteristic.Constraints && typeof characteristic.Constraints.StepValue !== 'undefined') {
		output.write(`,\n			minStep: ${characteristic.Constraints.StepValue}`);
	}
	output.write(',\n			perms: [');
	output.write(
		characteristic.Properties
			.map(property => {
				const perms = getCharacteristicPermsKey(property);
				if (perms) {
					return `Characteristic.Perms.${perms}`;
				}
			})
			.filter(perm => perm)
			.join(', ')
	);
	output.write(']');
	output.write('\n		});\n');

	output.write('	}\n}\n\n');

	output.write(`Characteristic.${classyName} = ${classyName};\n`);
	output.write(`Characteristic.${classyName}.UUID = '${characteristic.UUID}';\n\n`);

	if (characteristic.Constraints && characteristic.Constraints.ValidValues) {
		// this characteristic can only have one of a defined set of values (like an enum). Define the values
		// as static members of our subclass.
		output.write(`// The value property of ${classyName} must be one of the following:\n`);

		for (const value in characteristic.Constraints.ValidValues) {
			let name = characteristic.Constraints.ValidValues[value]
				.toUpperCase()
				.replace(/[^\w]+/g, '_');

			if ((/^[1-9]/).test(name)) {
				name = "_" + name; // variables can't start with a number
			}
			output.write(`Characteristic.${classyName}.${name} = ${value};\n`);
		}

		output.write('\n');
	}
});

/**
 * Services
 */

metadata.Services.forEach(service => {
	const classyName = service.Name.replace(/[\s\-]/g, ""); // "Smoke Sensor" -> "SmokeSensor"

	output.write("/**\n * Service \"" + service.Name + "\"\n */\n\n");
	output.write(`class ${classyName} extends Service {\n`);
	output.write('	constructor(displayName, subType) {\n');
	output.write(`		super(displayName, '${service.UUID}', subtype);\n`);

	// add Characteristics for this Service
	if (service.RequiredCharacteristics) {
		output.write('\n		// Required Characteristics\n');

		service.RequiredCharacteristics.forEach(uuid => {
			// look up the classyName from the hash we built above
			const characteristicClassyName = characteristics[uuid];
			output.write(`		this.addCharacteristic(Characteristic.${characteristicClassyName});\n`);
		});
	}

	// add "Optional" Characteristics for this Service
	if (service.OptionalCharacteristics) {
		output.write('\n  // Optional Characteristics\n');

		service.OptionalCharacteristics.forEach(uuid => {
			// look up the classyName from the hash we built above
			const characteristicClassyName = characteristics[uuid];
			output.write(`		this.addOptionalCharacteristic(Characteristic.${characteristicClassyName});\n`);
		});
	}

	output.write('	}\n}\n\n');
	output.write(`Service.${classyName} = ${classyName};\n`);
	output.write(`Service.${classyName}.UUID = '${service.UUID}';\n`);
});

output.write('const HomeKitTypesBridge = require(\'./HomeKitTypes-Bridge\');\n\n');

/**
 * Done!
 */

output.end();

/**
 * Useful functions
 */

function getCharacteristicFormatsKey(format) {
	// coerce 'int32' to 'int'
	if (format == 'int32') {
		format = 'int';
	}

	// look up the key in our known-formats dict
	for (const key in Characteristic.Formats) {
		if (Characteristic.Formats[key] === format) {
			return key;
		}
	}

	throw new Error(`Unknown characteristic format '${format}'`);
}

function getCharacteristicUnitsKey(units) {
	// look up the key in our known-units dict
	for (var key in Characteristic.Units) {
		if (Characteristic.Units[key] == units) {
			return key;
		}
	}

	throw new Error(`Unknown characteristic units '${units}'`);
}

function getCharacteristicPermsKey(perm) {
	switch (perm) {
		case "read":
			return "READ";
		case "write":
			return "WRITE";
		case "cnotify":
			return "NOTIFY";
		case "uncnotify":
			return undefined;
		default:
			throw new Error(`Unknown characteristic permission '${perm}'`);
	}
}
