import { prisma } from '$lib/prisma';
import { hashPassword } from '$lib/authUtils';

export const post = async ({ params, request }) => {
	const uid = params?.uid;
	const user = await request.json();

	if (user.newPassword) {
		const hashedPass = await hashPassword(user.newPassword);
		user.password = hashedPass;
		delete user.newPassword;
	}

	if (uid !== user.uid) {
		return {
			status: 409,
			body: {
				message: 'User ID conflict'
			}
		};
	}

	const updatedUser = await prisma.user.update({
		where: {
			uid: user.uid
		},
		data: {
			...user
		}
	});

	return {
		status: 200,
		body: updatedUser
	};
};
