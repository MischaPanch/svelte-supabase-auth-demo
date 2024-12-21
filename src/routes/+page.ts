import type { PageLoad } from './$types';
import { postsResponseSchema } from '$lib/schemas';

export const load: PageLoad = async ({ depends, fetch }) => {
	depends('app:posts');

	const { posts } = postsResponseSchema.parse(await (await fetch('/api/posts')).json());

	return {
		posts
	};
};
