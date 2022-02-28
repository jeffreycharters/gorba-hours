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
	import { recessedComponent } from '$lib/styles';

	import { slide } from 'svelte/transition';
	import UserAdminCard from './components/UserAdminCard.svelte';

	export let users;

	let filterText = '';
	let showSearch = false;

	$: visibleUsers = users.filter((u) =>
		u.username.toLowerCase().includes(filterText.toLowerCase())
	);
</script>

<div class="sm:max-w-lg sm:mx-auto">
	<div class="flex flex-row flex-wrap justify-between items-baseline w-full {recessedComponent}">
		<h1 class="text-2xl font-bold uppercase whitespace-nowrap text-emerald-700">User List</h1>
		<div
			class="cursor-pointer flex flex-row flex-nowrap items-center border border-slate-300 bg-slate-200 py-1 px-2 rounded-md"
			on:click={() => (showSearch = !showSearch)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 mr-1"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
					clip-rule="evenodd"
				/>
			</svg>
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

	<div class="flex flex-col gap-2 w-full">
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
</div>
