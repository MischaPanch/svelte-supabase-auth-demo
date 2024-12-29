import { error } from '@sveltejs/kit';
import { RequestHandler } from './$types';

export const POST: RequestHandler = async ({
	request,
	params: { id: authorId },
	locals: { session, db }
}) => {
	const { newName } = await request.json();

	if (!newName) {
		return error(400, { message: 'newName field missing' });
	}

	if (!session) {
		return error(401, { message: 'unauthorized' });
	}

	const author = await db.author.findFirst({
		where: {
			AND: [
				{
					id: session.user.id
				},
				{
					id: authorId
				}
			]
		}
	});

	if (!author) {
		return error(403, { message: 'author not found' });
	}

	const updatedAuthor = await db.author.update({
		where: {
			id: authorId
		},
		data: {
			name: newName
		}
	});

	return new Response();
};
