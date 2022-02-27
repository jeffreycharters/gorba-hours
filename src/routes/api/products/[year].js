import { getYearData } from './_db';

export const get = async ({ params }) => {
	const year = params.year;
	const aggregate = await getYearData(year);
	return {
		status: 200,
		body: {
			details: aggregate
		}
	};
};
