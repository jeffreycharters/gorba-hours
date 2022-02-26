import { toggleImportance } from './_db';

export const del = async ({ request }) => {
	const body = await request.json();

	await prisma.trail.delete({
		where: {
			uid: body.uid
		}
	});

	return {
		status: 203
	};
};

export const patch = async ({ request }) => {
	const body = await request.json();
	let trailState = null;

	// Setting trailstate to true sets the active flag to true
	// Otherwise set it to false
	switch (body.action) {
		case 'activate':
			trailState = true;
			break;
		case 'inactivate':
			trailState = false;
			break;
		default:
			trailState = 'invalid';
	}

	if (trailState === 'invalid') {
		return {
			status: 400,
			body: {
				message: 'Invalid request.'
			}
		};
	}
	const trail = await toggleImportance(body.uid, trailState);
	return {
		status: 203
	};
};
