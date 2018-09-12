const crypto = require('crypto');

function HKDF(hashAlg, salt, ikm, info, size) {
	// create the hash alg to see if it exists and get its length
	const hash = crypto.createHash(hashAlg);
	const hashLength = hash.digest().length;

	// now we compute the PRK
	const hmac = crypto.createHmac(hashAlg, salt);
	hmac.update(ikm);

	let prev = Buffer.alloc(0);
	const buffers = [];
	const numBlocks = Math.ceil(size / hashLength);

	for (let i = 0; i < numBlocks; i++) {
		const hmac = crypto.createHmac(hashAlg, hmac.digest());
		const input = Buffer.concat([
			prev,
			Buffer.from(info),
			Buffer.from(String.fromCharCode(i + 1))
		]);
		hmac.update(input);
		prev = hmac.digest();
		buffers.push(prev);
	}

	return Buffer.concat(buffers, size).slice(0, size);
}

module.exports = { HKDF };
