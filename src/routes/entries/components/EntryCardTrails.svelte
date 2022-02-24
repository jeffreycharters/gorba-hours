<script>
	export let entry;
</script>

<div class="flex flex-row flex-wrap">
	{#each entry.trails as trail (trail.uid)}
		<div
			class="text-sm py-0 px-2 my-1 mx-2 border-2 border-emerald-100 bg-emerald-50 text-emerald-500 rounded-md font-semibold"
		>
			{trail.name}
		</div>
	{/each}
</div>
