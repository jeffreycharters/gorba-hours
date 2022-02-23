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
