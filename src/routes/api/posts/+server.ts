import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { maxAnonPosts } from '$lib/server/constants';

export const GET: RequestHandler = async ({ request, locals: { session, db } }) => {
	const posts = await db.post.findMany({
		include: {
			author: true
		},
		orderBy: {
			date: 'desc'
		}
	});

	return json({
		posts
	});
};

export const POST: RequestHandler = async ({ request, locals: { db, session } }) => {
	const { text } = await request.json();

	if (!text) {
		return error(400, { message: 'text is required' });
	}

	if (!session) {
		return error(401, { message: 'unauthorized' });
	}

	const numPosts = await db.post.count({
		where: {
			authorId: session.user.id
		}
	});

	if (session.user.is_anonymous && numPosts >= maxAnonPosts) {
		return error(403, {
			message: `You are only allowed to make ${maxAnonPosts} posts as anonymous user. Log in to continue posting.`
		});
	}

	const post = await db.post.create({
		data: {
			text,
			date: new Date(),
			authorId: session.user.id
		}
	});

	return json({
		post
	});
};
