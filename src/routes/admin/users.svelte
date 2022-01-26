<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/api/users');
		const users = await res.json();

		if (users) {
			return {
				props: {
					users: users
				}
			};
		}
	};
</script>

<script>
	import UserAdminCard from './components/UserAdminCard.svelte';

	export let users;
</script>

<h1 class="text-2xl font-bold uppercase">User List</h1>

<div class="flex flex-col flex-nowrap gap-2">
	{#each users as user (user.uid)}
		<UserAdminCard {user} />
	{/each}
</div>
