<script lang="ts">
	import type { PostWithRelations } from '$lib/generated/zod';

	const { post }: { post: PostWithRelations } = $props();
</script>

<div class="w-full border p-2">
	<div class="flex flex-col justify-between pb-4 text-gray-500 md:flex-row">
		<span>@{post.author.name}</span>
		<span>{post.date_updated.toLocaleString('de-DE')}</span>
	</div>
	<p>{post.text}</p>
</div>
