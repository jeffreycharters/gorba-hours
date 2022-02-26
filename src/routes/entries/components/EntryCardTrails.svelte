<script>
	export let entry;
</script>

{#if entry.trails.length > 0}
	<div class="flex flex-row flex-wrap my-2">
		{#each entry.trails as trail (trail.uid)}
			<div
				class="text-sm py-1 px-2 my-1 mx-2 border border-emerald-500 bg-emerald-50 text-emerald-700 rounded-md font-semibold"
			>
				{trail.name}
			</div>
		{/each}
	</div>
{/if}
