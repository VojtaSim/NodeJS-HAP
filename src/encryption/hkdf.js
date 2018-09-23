const crypto = require('crypto');

function HKDF(hashAlg, salt, ikm, info, size) {
	// create the hash alg to see if it exists and get its length
	const hash = crypto.createHash(hashAlg);
	const hashLength = hash.digest().length;

	// now we compute the PRK
	let hmac = crypto.createHmac(hashAlg, salt);
	hmac.update(ikm);
	const prk = hmac.digest();

	let prev = Buffer.alloc(0);
	const buffers = [];
	const num_blocks = Math.ceil(size / hashLength);
	info = Buffer.from(info);

	for (var i = 0; i < num_blocks; i++) {
		hmac = crypto.createHmac(hashAlg, prk);

		var input = Buffer.concat([
			prev,
			info,
			Buffer.from(String.fromCharCode(i + 1))
		]);
		hmac.update(input);
		prev = hmac.digest();
		buffers.push(prev);
	}
	return Buffer.concat(buffers, size).slice(0, size);
}

module.exports = HKDF;
