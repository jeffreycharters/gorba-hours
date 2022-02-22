<script context="module">
	export const load = async ({ session }) => {
		if (!session?.authorized) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {
			props: {
				user: session.user
			}
		};
	};
</script>

<script>
	const logout = async () => {
		const res = await fetch('/auth/signout');
		if (res.ok) {
			window.location = '/';
		}
	};

	const links = [
		{ url: '/entries/new', text: 'New Entry' },
		{ url: '/entries/list', text: 'List Entries' },
		{ url: '/admin/users', text: 'User List' },
		{ url: '/locations', text: 'Location List' },
		{ url: '/entries/keywords', text: 'Keyword List' }
	];
</script>

<div class="text-2xl text-center m-2 font-bold">Where to, guv?</div>
<div class="flex flex-col flex-wrap gap-2 max-w-lg align-center mx-auto">
	{#each links as link (link.url)}
		<a href={link.url}>{link.text}</a>
	{/each}
	<button on:click={logout}>Logout</button>
</div>

<style lang="postcss">
	a,
	button {
		@apply text-lg mx-4 border-2 border-emerald-900 bg-emerald-500 rounded-md text-center p-2 text-emerald-50 font-bold;
	}

	a:hover,
	button:hover {
		@apply text-white translate-x-1;
	}
</style>
