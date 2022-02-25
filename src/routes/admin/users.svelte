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
	import { slide } from 'svelte/transition';
	import UserAdminCard from './components/UserAdminCard.svelte';

	export let users;

	let filterText = '';
	let showSearch = false;

	$: visibleUsers = users.filter((u) =>
		u.username.toLowerCase().includes(filterText.toLowerCase())
	);
</script>

<div class="flex flex-row flex-wrap justify-between items-baseline w-auto">
	<h1 class="text-2xl font-bold uppercase px-2 whitespace-nowrap">User List</h1>
	<div class="mx-4" on:click={() => (showSearch = !showSearch)}>
		{showSearch ? 'Hide Search' : 'Search Names'}
	</div>

	{#if showSearch}
		<div class="m-2 py-2 px-4 w-full text-right" transition:slide={{ duration: 200 }}>
			search:
			<input
				type="text"
				bind:value={filterText}
				class="py-1 px-3 rounded-md shadow-inner-sm border border-gray-200"
			/>
		</div>
	{/if}
</div>

<div class="flex flex-col gap-2 m-1 w-auto">
	{#if visibleUsers.length > 0}
		{#each visibleUsers as user (user.uid)}
			<UserAdminCard {user} />
		{/each}
	{:else}
		<div class="border border-red-700 bg-red-100 text-red-800 font-bold m-2 p-2 rounded-md">
			Uh oh, no {filterText} found.
		</div>
	{/if}
</div>
