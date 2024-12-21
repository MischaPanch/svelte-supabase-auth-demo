<script lang="ts">
	import type { AppContext } from '$lib/types';
	import { Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { getContext } from 'svelte';

	let text: string = $state('');
	let error: string | null = $state(null);

	const context = getContext<AppContext>('app');

	const onSubmitPost = async (event: Event) => {
		event.preventDefault();

		if (!event.target) return;

		const { success, message } = await context.submitPost(text);

		if (!success) {
			error = message || 'Error submitting post';
			return;
		}

		error = null;

		text = '';
	};
</script>

<form onsubmit={onSubmitPost} class="flex w-full flex-col gap-2">
	<textarea name="text" bind:value={text} class="w-full" placeholder="Your opinion..."></textarea>
	<button type="submit" disabled={!text.length}>Submit</button>
</form>

{#if error}
	<Alert class="border">
		<InfoCircleSolid slot="icon" class="h-5 w-5" />
		<span class="font-medium">{error}</span>
	</Alert>
{/if}
