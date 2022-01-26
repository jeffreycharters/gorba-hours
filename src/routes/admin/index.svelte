<script context="module">
	export const load = async ({ session }) => {
		if (!session?.user) {
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

<h1>Yup</h1>
