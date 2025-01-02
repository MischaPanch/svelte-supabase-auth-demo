import type { PageLoad } from './$types';
import { PostArrayResponseSchema } from '$lib/schemas';

export const load: PageLoad = async ({ depends, fetch }) => {
	depends('app:posts');

	const postsResponseJson = await (await fetch('/api/posts')).json();
	const { posts } = PostArrayResponseSchema.parse(postsResponseJson);

	return {
		posts
	};
};
