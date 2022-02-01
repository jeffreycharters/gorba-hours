import { slugify } from '$lib/dbUtils';
import { prisma } from '$lib/prisma';

export const get = async ({ params }) => {
	const locationSlug = params.location;

	const location = await prisma.location.findUnique({
		where: {
			slug: locationSlug
		}
	});

	if (!location) {
		return {
			status: 404
		};
	}

	const trails = await prisma.trail.findMany({
		where: {
			location: {
				uid: location.uid
			}
		}
	});

	return {
		status: 200,
		body: {
			location,
			trails
		}
	};
};

export const post = async ({ params, request }) => {
	const locationSlug = params.location;
	const trail = await request.json();
	trail.slug = slugify(trail.name);

	const location = await prisma.location.findUnique({
		where: {
			slug: locationSlug
		}
	});

	const newTrail = await prisma.trail.create({
		data: {
			name: trail.name,
			slug: trail.slug,
			locationUid: location.uid
		}
	});

	return {
		status: 200,
		body: { trail: newTrail }
	};
};
