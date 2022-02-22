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

{#each entries as entry (entry.uid)}
	<EntryCard {entry} />
{/each}
