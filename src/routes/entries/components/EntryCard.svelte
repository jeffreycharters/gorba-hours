<script>
	import EntryCardHours from './EntryCardHours.svelte';
	import EntryCardLocation from './EntryCardLocation.svelte';
	import EntryCardTags from './EntryCardTags.svelte';
	import EntryCardTitle from './EntryCardTitle.svelte';
	import EntryCardTrails from './EntryCardTrails.svelte';

	export let entry;
</script>

<div class="flex flex-col pt-1 pb-4 px-3 rounded-md shadow-inner-sm border bg-gray-100">
	<EntryCardTitle {entry} />

	<EntryCardHours {entry} />

	<EntryCardLocation {entry} />

	<EntryCardTrails {entry} />

	<div
		class="p-3 text-gray-700 text-sm font-semibold bg-gray-50 my-4 rounded-md border border-gray-300"
	>
		{entry.description || 'No description'}<br />
	</div>

	<EntryCardTags {entry} />
</div>
