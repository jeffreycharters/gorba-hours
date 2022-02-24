<script>
	import EntryCardHours from './EntryCardHours.svelte';
	import EntryCardLocation from './EntryCardLocation.svelte';
	import EntryCardTags from './EntryCardTags.svelte';
	import EntryCardTitle from './EntryCardTitle.svelte';
	import EntryCardTrails from './EntryCardTrails.svelte';

	export let entry;
</script>

<div class="flex flex-col py-4 px-3 shadow rounded-md bg-white">
	<EntryCardTitle {entry} />

	<EntryCardHours {entry} />

	<EntryCardLocation {entry} />

	<EntryCardTrails {entry} />

	<div class="p-3 text-gray-700 text-sm font-semibold bg-gray-100 my-4 rounded-md">
		{entry.description || 'No description'}<br />
	</div>

	<EntryCardTags {entry} />
</div>
