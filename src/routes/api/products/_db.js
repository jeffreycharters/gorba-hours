import { prisma } from '$lib/prisma';

export const getYearData = async (year) => {
	const aggregations = await prisma.entry.aggregate({
		_sum: {
			hours: true
		},
		where: {
			date: {
				gte: new Date(`${year}-01-01`),
				lte: new Date(`${year}-12-31`)
			}
		}
	});
	return Promise.resolve(aggregations);
};
