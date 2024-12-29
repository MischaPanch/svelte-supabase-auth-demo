import { z } from 'zod';
import { PostWithRelationsSchema } from '$lib/generated/zod';


export const baseResponseSchema = z.object({
	message: z.string().optional()
});

export const postResponseSchema = baseResponseSchema.extend({
	post: PostWithRelationsSchema.optional()
});

export const postsResponseSchema = baseResponseSchema.extend({
	posts: z.array(PostWithRelationsSchema)
});


export type PostsResponse = z.infer<typeof postsResponseSchema>;
