<script>
	export let entry;
</script>

<div class="flex flex-row flex-nowrap w-full justify-between items-center mt-2">
	<div class="bg-emerald-600 relative" style="flex-grow: 1; height: 1px;" />
	<div class="text-center px-4 text-emerald-700 font-bold">
		{#if entry.location.name === 'Other'}
			{entry.other_location}
		{:else if entry.location.name}
			{entry.location.name}
		{:else}
			Unknown Location
		{/if}
	</div>
	<div class="grow bg-emerald-600" style="flex-grow: 10; height: 1px;" />
</div>
