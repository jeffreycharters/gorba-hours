import crypto from 'crypto';

export const hashPassword = (plaintext) => {
	return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(16).toString('hex');

		crypto.scrypt(plaintext, salt, 64, (err, derivedKey) => {
			if (err) reject(err);
			resolve(salt + ':' + derivedKey.toString('hex'));
		});
	});
};

export const verify = (password, hash) => {
	return new Promise((resolve, reject) => {
		const [salt, key] = hash.split(':');
		crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err);
			resolve(key === derivedKey.toString('hex'));
		});
	});
};
