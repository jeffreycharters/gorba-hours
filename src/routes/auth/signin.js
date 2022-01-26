import bcrypt from 'bcrypt';
import { createSession, getUserByEmail } from './_db';
import { serialize } from 'cookie';

export const post = async ({ request }) => {
	const { email, password } = await request.json();

	const user = await getUserByEmail(email);

	const goodPassword = await bcrypt.compare(password, user.password);

	if (!user || !goodPassword) {
		return {
			status: 401,
			body: {
				message: 'Incorrect email or password.'
			}
		};
	}

	const { uid } = await createSession(email);
	return {
		status: 200,
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
			message: 'Sucessfully signed in'
		}
	};
};
