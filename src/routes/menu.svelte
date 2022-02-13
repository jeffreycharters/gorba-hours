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
</script>

<div class="text-2xl text-center m-2 font-bold">Where to, guv?</div>
<div class="flex flex-col flex-wrap gap-2">
	<a href="/entries/new">New Entry</a>
	<a href="/admin/users">User List</a>
	<a href="/locations">Location List</a>
	<a href="/entries/keywords">Keyword List</a>
	<button on:click={logout}>Logout</button>
</div>

<style lang="postcss">
	a,
	button {
		@apply text-lg mx-4 border-2 border-emerald-900 bg-emerald-500 rounded-md text-center p-2 text-emerald-50 font-bold;
	}
</style>
