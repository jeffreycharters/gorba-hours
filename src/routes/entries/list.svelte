<script context="module">
	import EntryCard from './components/EntryCard.svelte';

	export const load = async ({ fetch }) => {
		const res = await fetch('/api/entries');
		const data = await res.json();
		return {
			props: {
				entries: data.entries
			}
		};
	};
</script>

<script>
	export let entries;
</script>

<div class="bg-gray-400 p-1 flex flex-col gap-2 min-h-full">
	<div class="bg-white rounded-md py-2 px-4 text-3xl font-bold text-emerald-900">Entries - all</div>
	{#each entries as entry (entry.uid)}
		<EntryCard {entry} />
	{/each}
</div>
