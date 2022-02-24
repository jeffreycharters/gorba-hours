import { prisma } from '$lib/prisma';

export const getAllKeywords = async () => {
	const keywords = await prisma.keyword.findMany({});
	return Promise.resolve(keywords);
};

export const getActiveKeywords = async () => {
	const keywords = await prisma.keyword.findMany({
		where: {
			active: true
		}
	});
	return Promise.resolve(keywords);
};

export const createKeyword = async (keyword) => {
	let existingKeyword = await prisma.keyword.findUnique({
		where: {
			keyword
		}
	});
	let newKeyword = {};
	if (existingKeyword) {
		newKeyword = await prisma.keyword.update({
			where: {
				uid: existingKeyword.uid
			},
			data: {
				active: true
			}
		});
	} else {
		newKeyword = await prisma.keyword.create({
			data: {
				keyword,
				active: true
			}
		});
	}
	return Promise.resolve(newKeyword);
};

export const toggleKeywordActive = async (uid) => {
	const keyword = await prisma.keyword.findUnique({
		where: { uid }
	});
	const updatedKeyword = await prisma.keyword.update({
		where: { uid },
		data: {
			active: !keyword.active
		}
	});
	return Promise.resolve(updatedKeyword);
};

export const removeKeyword = async (uid) => {
	const removedKeyword = await prisma.keyword.delete({
		where: {
			uid
		}
	});
	return Promise.resolve(removedKeyword);
};
