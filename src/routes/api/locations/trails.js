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
