import { toggleImportance } from './_db';

export const del = async ({ request }) => {
	const body = await request.json();

	await prisma.trail.delete({
		where: {
			uid: body.uid
		}
	});

	return {
		status: 203
	};
};

export const patch = async ({ request }) => {
	const body = await request.json();

	const trail = await toggleImportance(body.uid);
	return {
		status: 203
	};
};
