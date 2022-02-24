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

<h1 class="text-2xl font-bold uppercase px-2">User List</h1>

<div class="flex flex-col gap-2 m-1 w-11/12">
	{#each users as user (user.uid)}
		<UserAdminCard {user} />
	{/each}
</div>
