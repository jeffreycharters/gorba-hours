import { parse } from 'cookie';
import { getSession as getSessionFromApi, getUserByEmail } from './routes/auth/_db';

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

export const getSession = async (request) => {
	const user = request?.locals?.user ? await getUserByEmail(request.locals.user.email) : null;
	if (user) {
		user.admin = user.role === 'admin' ? true : false;
		delete user.role;
		delete user.password;
	}

	return request?.locals?.user
		? {
				user,
				authorized: true
		  }
		: { authorized: false };
};
