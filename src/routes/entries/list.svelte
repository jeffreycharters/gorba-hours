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

<div class="p-1 flex flex-col gap-4 min-h-full sm:max-w-lg sm:mx-auto">
	<div
		class="text-2xl font-bold p-2 shadow-inner-sm bg-gray-100 rounded-md text-center text-emerald-700 border-slate-200 border"
	>
		All Entries
	</div>
	{#each entries as entry (entry.uid)}
		<EntryCard {entry} />
	{/each}
</div>
