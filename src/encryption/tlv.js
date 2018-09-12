'use strict';

/**
 * Type Length Value encoding/decoding, used by HAP as a wire format.
 * https://en.wikipedia.org/wiki/Type-length-value
 */

function encode(dataObject) {
	return Object.keys(dataObject).reduce((encodedTLVBuffer, type) => {
		let data = dataObject[type];

		if (typeof data === 'number') {
			data = Buffer.from([data]);
		} else if (typeof data === 'string') {
			data = Buffer.from(data);
		}

		let leftLength = data.length;
		let tempBuffer = Buffer.alloc(0);

		while (leftLength > 0) {
			const chunkLength = Math.min(255, leftLength);
			const start = data.length - leftLength;

			tempBuffer = Buffer.concat([
				tempBuffer,
				Buffer.from([type, chunkLength]),
				data.slice(start, start + chunkLength)
			]);

			leftLength -= chunkLength;
		}

		return Buffer.concat([encodedTLVBuffer, tempBuffer]);
	});
}

function decode(data) {
	const objects = {};
	let currentIndex = 0;

	while (currentIndex < data.length) {
		const type = data[currentIndex];
		const length = data[++currentIndex];

		currentIndex += 2;

		const newData = data.slice(++currentIndex, currentIndex + length);
		currentIndex += length;

		if (objects[type]) {
			objects[type] = Buffer.concat([objects[type], newData]);
		} else {
			objects[type] = newData;
		}
	}

	return objects;
}

module.exports = { encode, decode };
