import { getAllKeywords, createKeyword, toggleKeywordActive, removeKeyword } from './_db';

export const get = async () => {
	const keywords = await getAllKeywords();
	return {
		status: 200,
		body: {
			keywords
		}
	};
};

export const post = async ({ request }) => {
	const keyword = await request.json();
	const newKeyword = createKeyword(keyword.keyword.toLowerCase());
	return {
		status: 200,
		body: { keyword: await newKeyword }
	};
};

export const del = async ({ request }) => {
	const body = await request.json();
	const removedKeyword = await removeKeyword(body.uid);
	return {
		status: 200,
		body: { keyword: removedKeyword }
	};
};

export const put = async ({ request }) => {
	const body = await request.json();
	const updatedKeyword = await toggleKeywordActive(body.uid);
	return {
		status: 200,
		body: { keyword: updatedKeyword }
	};
};
