import { hashPassword } from '$lib/authUtils';
import cuid from 'cuid';

import { prisma } from '$lib/prisma';

export const getUserByEmail = async (email) => {
	const existingUser = await prisma.user.findUnique({
		where: {
			email
		}
	});
	if (!existingUser) return Promise.resolve(null);
	return Promise.resolve(existingUser);
};

export const registerUser = async (user) => {
	const { username, email, password } = user;
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [
				{
					username: user.username
				},
				{
					email: user.email
				}
			]
		}
	});

	if (!!existingUser) {
		return Promise.reject(new Error('Username or email already exist.'));
	}

	const hashedPass = await hashPassword(password);

	await prisma.user.create({
		data: {
			username: username,
			email: email,
			password: hashedPass
		}
	});

	return Promise.resolve(user);
};

export const createSession = async (email) => {
	const session = {
		uid: cuid(),
		email
	};

	await prisma.session.deleteMany({
		where: {
			email: email
		}
	});

	await prisma.session.create({
		data: session
	});

	return Promise.resolve(session);
};

export const getSession = async (uid) => {
	const session = await prisma.session.findUnique({
		where: {
			uid: uid
		}
	});
	if (!session) return Promise.resolve(null);
	return Promise.resolve(session);
};

export const removeSession = async (uid) => {
	const session = await prisma.session.findUnique({
		where: {
			uid: uid
		}
	});

	if (!session) return Promise.reject(new Error('Session not found'));

	await prisma.session.delete({
		where: {
			uid: uid
		}
	});
	return Promise.resolve(session);
};
