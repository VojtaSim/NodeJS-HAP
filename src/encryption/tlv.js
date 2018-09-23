/**
 * Type Length Value encoding/decoding, used by HAP as a wire format.
 * https://en.wikipedia.org/wiki/Type-length-value
 */

function encode(plainData) {

	return Object.keys(plainData).reduce((encodedTLVBuffer, type) => {
		let data = plainData[type];

		// coerce data to Buffer if needed
		if (typeof data === 'number') {
			data = Buffer.from([data]);
		} else if (typeof data === 'string') {
			data = Buffer.from(data);
		}

		let currentStart = 0;
		let tempBuffer = Buffer.alloc(0);

		while(currentStart < data.length) {
			const leftLength = Math.min(255, data.length - currentStart);
			tempBuffer = Buffer.concat([
				tempBuffer, 
				Buffer.from([type, leftLength]),
				data.slice(currentStart, currentStart + leftLength)
			]);

			currentStart += leftLength
		}

		return Buffer.concat([encodedTLVBuffer, tempBuffer]);

	}, Buffer.alloc(0));
}

function decode(data) {

	const objects = {};
	let currentIndex = 0;

	for (; currentIndex < data.length;) {
		const type = data[currentIndex++];
		const length = data[currentIndex++];
		const newData = data.slice(currentIndex, currentIndex + length);

		if (objects[type]) {
			objects[type] = Buffer.concat([objects[type], newData]);
		} else {
			objects[type] = newData;
		}

		currentIndex += length;
	}

	return objects;
}

module.exports = { encode, decode };
