<script context="module">
	import { protectedRoute } from '$lib/authUtils';
	export const load = async ({ session }) => {
		return protectedRoute(session, {});
	};
</script>

<script>
	import { user } from '$lib/stores';
	const logout = async () => {
		const res = await fetch('/auth/signout');
		if (res.ok) {
			window.location = '/';
		}
	};

	const links = [
		{ url: '/products', text: 'Output Products', admin: false },
		{ url: '/entries/new', text: 'New Entry', admin: false },
		{ url: '/entries/list', text: 'List Entries', admin: false },
		{ url: '/admin/users', text: 'User List', admin: true },
		{ url: '/locations', text: 'Location List', admin: false },
		{ url: '/entries/keywords', text: 'Keyword List', admin: true }
	];
</script>

<div class="w-full sm:max-w-lg sm:mx-auto">
	<div class="text-2xl text-center m-2 font-bold">Where to, {$user.username}?</div>
	<div class="flex flex-col flex-wrap gap-2 max-w-lg align-center mx-auto">
		{#each links as link (link.url)}
			{#if !link.admin || (link.admin && $user.admin)}
				<a sveltekit:prefetch href={link.url}>{link.text}</a>
			{/if}
		{/each}
		<button on:click={logout}>Logout</button>
	</div>
</div>

<style lang="postcss">
	a,
	button {
		@apply text-lg mx-4 border border-slate-300 bg-slate-100 rounded-md text-center p-2 text-emerald-700 font-bold shadow-md transition-all ease-in-out duration-100;
	}

	a:hover,
	button:hover {
		@apply text-emerald-600 bg-emerald-100 border border-slate-300 shadow-inner-sm;
		transform: translateY(-1px);
	}
</style>
