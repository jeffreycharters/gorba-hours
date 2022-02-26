import { prisma } from '$lib/prisma';
import { getAllLocations } from './_db';
import { slugify } from '$lib/dbUtils';

export const get = async () => {
	const locations = await getAllLocations();
	return {
		status: 200,
		body: {
			locations
		}
	};
};

export const post = async ({ request }) => {
	const location = await request.json();
	location.slug = slugify(location.name);

	const newLocation = await prisma.location.create({
		data: {
			name: location.name,
			slug: location.slug
		}
	});
	return {
		status: 200,
		body: { location: newLocation }
	};
};

export const del = async ({ request }) => {
	const body = await request.json();

	// await prisma.location.delete({
	// 	where: {
	// 		uid: body.uid
	// 	}
	// });

	return {
		status: 203
	};
};
