import { z } from 'zod';

export const authorSchema = z.object({
	userId: z.string(),
	name: z.string(),
	role: z.enum(['ADMIN', 'USER'])
});

export const postSchema = z.object({
	text: z.string(),
	author: authorSchema,
	date: z.coerce.date()
});

export const baseResponseSchema = z.object({
	message: z.string().optional()
});

export const postResponseSchema = baseResponseSchema.extend({
	post: postSchema.optional()
});

export const postsResponseSchema = baseResponseSchema.extend({
	posts: z.array(postSchema)
});

export type Author = z.infer<typeof authorSchema>;
export type Post = z.infer<typeof postSchema>;
export type PostsResponse = z.infer<typeof postsResponseSchema>;
