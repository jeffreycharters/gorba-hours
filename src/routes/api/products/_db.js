import { prisma } from '$lib/prisma';

export const getYearData = async (year) => {
	const aggregations = await prisma.entry.aggregate({
		_sum: {
			hours: true
		}
	});
	return Promise.resolve(aggregations);
};
