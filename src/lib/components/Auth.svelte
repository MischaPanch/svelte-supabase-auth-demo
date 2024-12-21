<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { Author } from '$lib/schemas';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import * as EmailValidator from 'email-validator';
	import { Spinner } from 'flowbite-svelte';

	let {
		supabase,
		author = null,
		session = $bindable(null)
	}: { supabase: SupabaseClient; author: Author | null; session: Session | null } = $props();

	let isAnon = $derived(!session || session.user.is_anonymous);

	let email: string = $state('');
	let otp: number | null = $state(null);

	let submitValid = $derived(EmailValidator.validate(email));

	let authorName: string | null = $state(null);

	let verifyingLogin = $state(false);
	let verifyingOtp = $state(false);

	let askForEmail = $state(true);
	let askForOtp = $state(false);

	let otpType: 'email_change' | 'email' | null = $state(null);

	let submitButtonEnabled = $derived(
		(submitValid && !verifyingLogin) || (askForOtp && !verifyingOtp)
	);
	let submitButtonText = $derived(askForOtp ? 'Verify OTP' : 'Log in');

	let isLoading = $derived(verifyingLogin || verifyingOtp);

	$effect(() => {
		if (author) {
			authorName = author.name;
		}
	});

	const login = async () => {
		let signIn = true;

		if (session) {
			let { error: updateError } = await supabase.auth.updateUser({ email });

			console.log('email appears to be already attached to a user');

			signIn = !!updateError;
		}

		verifyingLogin = false;

		if (signIn) {
			otpType = 'email';

			const { data, error: signInError } = await supabase.auth.signInWithOtp({ email });

			console.log({ data, signInError });

			askForOtp = true;
			askForEmail = false;

			return;
		} else {
			otpType = 'email_change';

			askForOtp = true;
			askForEmail = false;
		}

		askForOtp = true;
		askForEmail = false;
	};

	const verifyOtp = async () => {
		console.log('verifying otp');

		verifyingOtp = true;

		if (!otp) {
			console.error('otp is undefined');
			verifyingOtp = false;
			return;
		}
		if (!otpType) {
			console.error('otpType is undefined');
			verifyingOtp = false;
			return;
		}

		const {
			data: { user },
			error
		} = await supabase.auth.verifyOtp({
			email,
			token: otp.toString(),
			type: otpType
		});

		verifyingOtp = false;

		if (error) {
			console.error(`error verifying otp: ${error}`);
			return;
		}

		console.log(`otp verified successfully`);

		if (!user) {
			console.error('user is undefined');
			return;
		}

		if (otpType === 'email_change') {
			const res = await fetch(`/api/authors/${session?.user.id}`, {
				method: 'POST',
				body: JSON.stringify({
					newName: user.email
				})
			});
		}
	};

	const onSubmitNameChange = async (event: Event) => {
		event.preventDefault();

		if (!authorName) {
			console.error('authorName is undefined');
			return;
		}

		const userId = session?.user.id;

		const res = await fetch(`/api/authors/${userId}`, {
			method: 'POST',
			body: JSON.stringify({
				newName: authorName
			})
		});

		if (!res.ok) {
			console.error('error updating author name');
			return;
		}

		console.log('author name updated successfully');

		invalidate('app:author');
		invalidate('app:posts');
	};
</script>

<div class="flex flex-col items-center gap-6 border p-2">
	{#if isAnon}
		<p class="text-center">
			You are posting anonymously.<br />Log in with your email address to claim your posts.
		</p>

		<form class="flex w-full flex-col gap-2">
			<input
				type="email"
				name="email"
				class="grow"
				placeholder="email"
				bind:value={email}
				disabled={!askForEmail || verifyingLogin}
			/>
			{#if askForOtp}
				<input
					type="number"
					name="otp"
					class="w-full"
					placeholder="enter the otp we sent to your email address"
					maxlength="6"
					bind:value={otp}
					disabled={verifyingOtp}
				/>
			{/if}
			<button
				onclick={() => {
					askForOtp ? verifyOtp() : login();
				}}
				disabled={!submitButtonEnabled}
			>
				{#if isLoading}
					<Spinner size={4} color="purple" />
				{/if}
				{submitButtonText}</button
			>
		</form>
	{:else}
		<p class="text-center">
			You are posting as @{author?.name}<br />Be cautious! We know where your house lives.
		</p>

		<div class="flex h-8 w-full flex-row gap-4 divide-x">
			<form class="flex grow flex-row gap-2" onsubmit={onSubmitNameChange}>
				<input
					type="text"
					name="text"
					class="grow"
					placeholder="Choose a name..."
					bind:value={authorName}
				/>
				<button type="submit" disabled={!authorName || !authorName.length}>Change name</button>
			</form>

			<vr class="border-4"></vr>

			<button
				class="h-full w-24"
				onclick={async () => {
					await supabase.auth.signOut();
				}}
			>
				Sign out
			</button>
		</div>
	{/if}
</div>

<style lang="postcss">
	form > div {
		@apply flex flex-row items-center gap-4;
	}
</style>
