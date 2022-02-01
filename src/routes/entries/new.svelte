<script context="module">
	export const load = async ({ session }) => {
		return {
			props: {
				user: session.user
			}
		};
	};
</script>

<script>
	import AddEntryForm from './components/AddEntryForm.svelte';
	export let user;
</script>

<AddEntryForm {user} />
