import { z } from 'zod';
import { PostWithRelationsSchema } from '$lib/generated/zod';

export const MessageResponseSchema = z.object({
	message: z.string().optional()
});

export const PostArrayResponseSchema = MessageResponseSchema.extend({
	posts: z.array(PostWithRelationsSchema)
});

export type PostArrayResponse = z.infer<typeof PostArrayResponseSchema>;
