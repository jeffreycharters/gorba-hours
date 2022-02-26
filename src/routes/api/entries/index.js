import { prisma } from '$lib/prisma';
import { slugify } from '$lib/dbUtils';

export const get = async ({ request }) => {
	const entries = await prisma.entry.findMany({
		include: {
			owner: {
				select: { username: true }
			},
			location: {
				select: { name: true }
			},
			trails: {
				select: { name: true, uid: true }
			},
			keywords: {
				select: { keyword: true, uid: true }
			}
		},
		orderBy: {
			date: 'desc'
		}
	});

	return {
		status: 200,
		body: {
			entries
		}
	};
};

export const post = async ({ request }) => {
	const data = await request.json();
	const form = data.form;

	const dateObject = new Date(form.date);

	const trailConnect = [];
	form.trails.forEach((t) => trailConnect.push({ uid: t }));

	const keywordConnect = [];
	form.tags.forEach((t) => keywordConnect.push({ uid: t }));

	const newEntry = await prisma.entry.create({
		data: {
			owner: {
				connect: { email: form.user }
			},
			date: dateObject,
			title: form.title,
			location: {
				connect: { slug: form.location }
			},
			other_location: form.otherLocation || null,
			volunteers: form.volunteers,
			hours: form.hours,
			trails: {
				connect: trailConnect
			},
			keywords: {
				connect: keywordConnect
			},
			description: form.description
		}
	});

	console.log(newEntry);

	return {
		status: 200,
		body: { hello: 'hello' }
	};
};
