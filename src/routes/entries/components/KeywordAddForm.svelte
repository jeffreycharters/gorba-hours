<script>
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();
	let newKeyword = '';
	const handleSubmit = () => {
		dispatch('addKeyword', newKeyword);
		newKeyword = '';
	};
</script>

<form class="flex flex-col mt-10 mx-2" on:submit|preventDefault={handleSubmit} autocomplete="off">
	<label for="new-keyword" class="font-bold text-slate-500 ml-2 text-xl">Add new</label>
	<input
		type="text"
		placeholder="short, generic"
		id="new-keyword"
		class="rounded-md"
		bind:value={newKeyword}
	/>
	<input
		type="submit"
		value="ADD KEYWORD"
		class="mt-2 p-2 rounded-md border-2 border-emerald-600 bg-emerald-100 text-emerald-700 font-bold tracking-wider"
	/>
</form>
