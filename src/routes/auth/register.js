import { createSession, getUserByEmailOrUsername, registerUser } from './_db';
import { serialize } from 'cookie';
import { emailRegex } from '$lib/authUtils';

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

	const emailValid = emailRegex.test(email);
	if (!emailValid) {
		return {
			status: 400,
			body: { message: 'Malformed email address.' }
		};
	}

	const user = await getUserByEmailOrUsername(email, username);
	if (user.uid) {
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
