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

<div class="p-1 flex flex-col gap-4 min-h-full">
	<div
		class="rounded-md py-4 px-4 text-3xl font-bold text-emerald-600 bg-emerald-50 shadow-inner-sm text-center border-b-emerald-200 border-b"
	>
		All Entries
	</div>
	{#each entries as entry (entry.uid)}
		<EntryCard {entry} />
	{/each}
</div>
