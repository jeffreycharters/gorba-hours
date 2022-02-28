<script>
	import { user } from '$lib/stores';
	import AddEntryForm from './components/AddEntryForm.svelte';
</script>

<AddEntryForm user={$user} />
