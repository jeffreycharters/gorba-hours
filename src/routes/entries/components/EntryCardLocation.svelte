<script>
	export let entry;
</script>

<div class="flex flex-row flex-nowrap w-full justify-between items-baseline mt-2">
	<div class="bg-emerald-200 h-1" style="flex-grow: 1;" />
	<div class="text-center px-4 text-emerald-700 font-bold">
		{#if entry.location.name === 'Other'}
			{entry.other_location}
		{:else if entry.location.name}
			{entry.location.name}
		{:else}
			Unknown Location
		{/if}
	</div>
	<div class="grow bg-emerald-200 h-1" style="flex-grow: 5;" />
</div>
