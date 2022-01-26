import { removeSession } from './_db';
import { parse, serialize } from 'cookie';

export const get = async ({ request }) => {
	const cookies = parse(request.headers.get('cookie') || '');

	if (cookies.session_id) {
		await removeSession(cookies.session_id);
	}

	return {
		status: 200,
		headers: {
			'Set-Cookie': serialize('session_id', '', {
				path: '/',
				expires: new Date(0)
			})
		}
	};
};
