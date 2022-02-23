import { getOtherLocations } from './_db';

export const get = async () => {
	const otherLocations = await getOtherLocations();
	return {
		status: 200,
		body: {
			otherLocations
		}
	};
};
