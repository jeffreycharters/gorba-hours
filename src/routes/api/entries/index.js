import { prisma } from '$lib/prisma';
import { slugify } from '$lib/dbUtils';

export const post = async ({ request }) => {
	const data = await request.json();

	console.log(data);

	return {
		status: 200,
		body: { hello: 'hello' }
	};
};
