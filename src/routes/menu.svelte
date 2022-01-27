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

<div class="flex flex-row flex-wrap gap-4">
	<a href="/admin/users">User List</a>
	<a href="/locations">Location List</a>
	<button on:click={logout}>Logout</button>
</div>
