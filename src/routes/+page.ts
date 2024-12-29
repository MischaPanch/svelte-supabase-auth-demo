import type { PageLoad } from './$types';
import { postsResponseSchema } from '$lib/schemas';

export const load: PageLoad = async ({ depends, fetch }) => {
	depends('app:posts');

	const postsResponseJson = await (await fetch('/api/posts')).json();
	const { posts } = postsResponseSchema.parse(postsResponseJson);

	return {
		posts
	};
};
