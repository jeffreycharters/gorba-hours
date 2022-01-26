import { createSession, getUserByEmail, registerUser } from './_db';
import { serialize } from 'cookie';

export const post = async ({ request }) => {
	const { username, email, password } = await request.json();

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
