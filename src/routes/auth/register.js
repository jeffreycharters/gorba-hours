import { createSession, getUserByEmail, registerUser } from './_db';
import { serialize } from 'cookie';

export const post = async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		body = undefined;
	}
	if (!body?.username || !body?.email || !body?.password) {
		return {
			status: 400,
			body: {
				message: 'Missing username, email or password.'
			}
		};
	}

	const { username, email, password } = body;

	const emailRegex =
		/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
	emailValid = emailRegex.test(email);
	if (!emailValid) {
		return {
			status: 400,
			body: { message: 'Malformed email address.' }
		};
	}

	const user = await getUserByEmail(email);

	if (user) {
		return {
			status: 409,
			body: {
				message: 'User already exists'
			}
		};
	}

	await registerUser({
		username,
		email,
		password
	});

	const { uid } = await createSession(email);
	return {
		status: 201,
		headers: {
			'Set-Cookie': serialize('session_id', uid, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			})
		},
		body: {
			message: 'Successfully signed up'
		}
	};
};
