<script context="module">
	export const load = async ({ session }) => {
		if (session?.user) {
			return {
				status: 302,
				redirect: '/menu'
			};
		}

		return {
			props: {}
		};
	};
</script>

<script>
	import RegistrationForm from './auth/components/RegistrationForm.svelte';
	import SignInForm from './auth/components/SignInForm.svelte';

	let signin = true;

	const toggleSignin = () => {
		signin = !signin;
	};

	const redirectToMenu = () => {
		window.location = '/menu';
	};
</script>

<div class="flex w-full justify-center">
	{#if signin}
		<SignInForm on:success={redirectToMenu} on:toggle={toggleSignin} />
	{:else}
		<RegistrationForm on:success={redirectToMenu} on:toggle={toggleSignin} />
	{/if}
</div>
