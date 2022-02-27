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
		if (!hash) reject('No password supplied');
		const [salt, key] = hash.split(':');
		crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err);
			resolve(key === derivedKey.toString('hex'));
		});
	});
};

export const emailRegex =
	/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;

export const protectedRoute = (session, base = {}) => {
	if (!session.authorized) {
		return {
			redirect: '/',
			status: 303
		};
	}
	return base;
};
