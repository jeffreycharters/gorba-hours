import { prisma } from '$lib/prisma';

export const get = async () => {
	const exclude = (users, ...keys) => {
		for (let user of users) {
			for (let key of keys) {
				delete user[key];
			}
		}
		return users;
	};

	const users = await prisma.user.findMany({});
	const usersWithoutPasswords = exclude(users, 'password');
	if (usersWithoutPasswords) {
		return {
			status: 200,
			body: usersWithoutPasswords
		};
	}
};
