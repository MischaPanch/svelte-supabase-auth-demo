<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import Auth from '$lib/components/Auth.svelte';
	import Post from '$lib/components/Post.svelte';
	import type { AppContext, AppResponse } from '$lib/types';
	import PostForm from '$lib/components/PostForm.svelte';
	import { postsResponseSchema } from '$lib/schemas';

	
	let { data }: { data: PageData } = $props();

	let { session, author, supabase, posts } = $derived(data);

	setContext<AppContext>('app', {
		submitPost: async (text: string): Promise<AppResponse> => {
			console.log(`submitting post: ${text}`);

			const res = await fetch('/api/posts', {
				method: 'POST',
				body: JSON.stringify({ text })
			});

			if (!res.ok) {
				const { message } = postsResponseSchema.parse(await res.json());

				return {
					success: false,
					message
				};
			}

			invalidate('/api/posts');

			return {
				success: true
			};
		}
	});
</script>

<div class="flex flex-col gap-8">
	<h1 class="text-4xl font-semibold text-center">Opinion Exchange Network</h1>

	<Auth {supabase} {session} {author} />

	<PostForm />

	<div class="flex flex-col gap-2">
		{#if !posts.length}
			<p>No posts yet</p>
		{:else}
			{#each posts as post}
				<Post {post} />
			{/each}
		{/if}
	</div>
</div>
