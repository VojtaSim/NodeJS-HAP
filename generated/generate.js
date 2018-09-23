'use strict';

const path = require('path');
const fs = require('fs');
const Characteristic = require('../src/Characteristic');
const servicesJson = require('../apple-defined/services.json');
const characteristicsJson = require('../apple-defined/characteristics.json');

// begin writing the output file
const servicesOutputPath = path.join(__dirname, 'HomeKitServices.js');
const characteristicsOutputPath = path.join(__dirname, 'HomeKitCharacteristics.js');

let output = fs.createWriteStream(characteristicsOutputPath);

output.write("// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY\n");
output.write("\n");
output.write("const Characteristic = require('../src/Characteristic');\n");
output.write("\n");

/**
 * Characteristics
 */

// index Characteristics for quick access while building Services
const characteristics = {}; // characteristics[UUID] = classyName

characteristicsJson.forEach(characteristic => {
	characteristics[characteristic.uuid] = characteristic.name;

	output.write(`/**\n * Characteristic "${characteristic.displayName}"\n */\n\n`);
	output.write(`class ${characteristic.name} extends Characteristic {\n`);
	output.write('	constructor() {\n');
	output.write(`		super('${characteristic.displayName}', '${characteristic.uuid}', {\n`);

	// apply Characteristic properties
	output.write(`			format: Characteristic.Formats.${getCharacteristicFormatsKey(characteristic.props.format)}`);

	output.write(',\n			perms: [');
	output.write(
		characteristic.props.perms
			.map(perm => 'Characteristic.Perms.' + getCharacteristicPermsKey(perm))
			.filter(perm => perm)
			.join(', ')
	);
	output.write(']');

	// special unit type?
	if (characteristic.props.unit) {
		output.write(`,\n			unit: Characteristic.Units.${getCharacteristicUnitsKey(characteristic.props.unit)}`);
	}
	if (characteristic.props.maxValue !== undefined) {
		output.write(`,\n			maxValue: ${characteristic.props.maxValue}`);
	}
	if (characteristic.props.minValue !== undefined) {
		output.write(`,\n			minValue: ${characteristic.props.minValue}`);
	}
	if (characteristic.props.minStep !== undefined) {
		output.write(`,\n			minStep: ${characteristic.props.minStep}`);
	}
	if (characteristic.props.description !== undefined) {
		output.write(`,\n			description: ${characteristic.props.description}`);
	}
	if (characteristic.props.validValues !== undefined) {
		output.write(`,\n			validValues: [${characteristic.props.validValues.join(',')}]`);
	}
	if (characteristic.props.validValuesRange !== undefined) {
		output.write(`,\n			validValuesRange: [${characteristic.props.validValuesRange.join(',')}]`);
	}
	if (characteristic.props.maxLen !== undefined) {
		output.write(`,\n			maxLen: ${characteristic.props.maxLen}`);
	}
	if (characteristic.props.maxDataLen !== undefined) {
		output.write(`,\n			maxDataLen: ${characteristic.props.maxDataLen}`);
	}
	output.write('\n		});\n');

	output.write('	}\n}\n\n');

	output.write(`Characteristic.${characteristic.name} = ${characteristic.name};\n`);
	output.write(`Characteristic.${characteristic.name}.UUID = '${characteristic.uuid}';\n\n`);

	if (characteristic.predefinedValues) {
		// this characteristic can only have one of a defined set of values (like an enum). Define the values
		// as static members of our subclass.
		output.write(`// The value property of ${characteristic.name} must be one of the following:\n`);

		for (const key in characteristic.predefinedValues) {
			output.write(`Characteristic.${characteristic.name}.${key} = ${characteristic.predefinedValues[key]};\n`);
		}

		output.write('\n');
	}
});

output.end();

output = fs.createWriteStream(servicesOutputPath);

output.write("// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY\n");
output.write("\n");
output.write("const Service = require('../src/Service');\n");
output.write("const Characteristic = require('../src/Characteristic');\n");
output.write("\n");

/**
 * Services
 */

servicesJson.forEach(service => {

	output.write(`/**\n * Service "${service.name}"\n */\n\n`);
	output.write(`class ${service.name} extends Service {\n`);
	output.write('	constructor(displayName, subType) {\n');
	output.write(`		super(displayName, '${service.uuid}', subType);\n`);

	// add Characteristics for this Service
	if (service.characteristics) {
		output.write('\n		// Required Characteristics\n');

		service.characteristics.forEach(uuid => {
			output.write(`		this.addCharacteristic(Characteristic.${characteristics[uuid]});\n`);
		});
	}

	// add "Optional" Characteristics for this Service
	if (service.optionalCharacteristics) {
		output.write('\n  // Optional Characteristics\n');

		service.optionalCharacteristics.forEach(uuid => {
			output.write(`		this.addOptionalCharacteristic(Characteristic.${characteristics[uuid]});\n`);
		});
	}

	output.write('	}\n}\n\n');
	output.write(`Service.${service.name} = ${service.name};\n`);
	output.write(`Service.${service.name}.UUID = '${service.uuid}';\n`);
});

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

function getCharacteristicUnitsKey(unit) {

	for (const key in Characteristic.Units) {
		if (Characteristic.Units[key] == unit) {
			return key;
		}
	}

	throw new Error(`Unknown characteristic units '${units}'`);
}

function getCharacteristicPermsKey(perm) {

	for (const key in Characteristic.Perms) {
		if (Characteristic.Perms[key] === perm) {
			return key;
		}
	}

	throw new Error(`Unknown characteristic permission '${perm}'`);
}
