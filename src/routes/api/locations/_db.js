import { prisma } from '$lib/prisma';

export const getAllLocations = async () => {
	const locations = await prisma.location.findMany({});
	return Promise.resolve(locations);
};

export const getOtherLocations = async () => {
	const locations = await prisma.entry.findMany({
		where: {
			location: {
				slug: 'other'
			},
			NOT: {
				other_location: ''
			}
		}
	});
	return Promise.resolve(locations);
};

export const toggleImportance = async (uid, activeState) => {
	const trail = await prisma.trail.findUnique({
		where: {
			uid
		}
	});
	const updatedTrail = await prisma.trail.update({
		where: {
			uid: uid
		},
		data: {
			active: !trail.active
		}
	});

	return Promise.resolve(updatedTrail);
};
