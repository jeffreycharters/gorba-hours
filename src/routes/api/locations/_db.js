import { prisma } from '$lib/prisma';

export const getAllLocations = async () => {
	const locations = await prisma.location.findMany({});
	return Promise.resolve(locations);
};
