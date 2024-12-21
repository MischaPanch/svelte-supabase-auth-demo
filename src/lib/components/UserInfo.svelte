<script lang="ts">
	let { user }: { user: ForumUser } = $props();

	let role = $state(user.forumRole);

	const changeRole = async () => {};
</script>

<div class="vstack">
	<p>Welcome, {user.email}</p>

	<div class="hstack">
		<span>Role:</span>
		<select name="role" id="role" class="grow" bind:value={role} onchange={() => {}}>
			<option value="admin">Admin</option>
			<option value="user">User</option>
		</select>
	</div>
</div>
