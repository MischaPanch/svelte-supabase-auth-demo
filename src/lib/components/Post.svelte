<script lang="ts">
	import type { Post } from '$lib/schemas';
	import { text } from '@sveltejs/kit';

	const { post }: { post: Post } = $props();
</script>

<div class="w-full border p-2">
	<div class="flex flex-col justify-between pb-4 text-gray-500 md:flex-row">
		<span>@{post.author.name}</span>
		<span>{post.date.toLocaleString('de-DE')}</span>
	</div>
	<p>{post.text}</p>
</div>
