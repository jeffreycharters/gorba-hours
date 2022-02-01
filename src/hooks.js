import { parse } from 'cookie';
import { getSession as getSessionFromApi } from './routes/auth/_db';

export const handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');

	if (cookies.session_id) {
		const session = await getSessionFromApi(cookies.session_id);
		if (session) {
			event.locals.user = { email: session.email, uid: session.uid };
			return resolve(event);
		}
	}

	event.locals.user = null;
	return resolve(event);
};

export const getSession = (request) => {
	return request?.locals?.user
		? {
				user: {
					email: request.locals.user.email,
					uid: request.locals.user.uid
				},
				authorized: true
		  }
		: { authorized: false };
};
