import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { maxAnonPosts } from '$lib/server/constants';
import { Prisma } from '@prisma/client';

export const GET: RequestHandler = async ({ request, locals: { db, session } }) => {

	if (!session) {
		return error(401, { message: 'unauthorized' });
	}

	const authorId = session.user.id;

	const posts = await db.post.findMany({
		where: {
			author_id: authorId
		},
		include: {
			author: true
		},
		orderBy: {
			date_created: 'desc'
		}
	});

	return json({
		posts
	});
};

export const POST: RequestHandler = async ({ request, locals: { db, session } }) => {

	if (!session) {
		return error(401, { message: 'unauthorized' });
	}

	const authorId = session.user.id;
	// write author to db if not already present
	await db.author.upsert({
		where: {
			id: authorId
		},
		create: {
			id: authorId,
			email: session.user.email || null,
		},
		update: {}
	});;



	const { text } = await request.json();

	if (!text) {
		return error(400, { message: 'text is required' });
	}

	const numPosts = await db.post.count({
		where: {
			author_id: authorId,
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
			author: {connect: {id: authorId}}
		}
	});

	return json({
		post
	});
};
