import { prisma } from '$lib/prisma';

export const post = async ({ params, request }) => {
	const uid = params?.uid;
	const user = await request.json();

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
