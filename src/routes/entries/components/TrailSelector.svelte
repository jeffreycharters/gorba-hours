<script>
	export let trails;
	export let trailView;
</script>

<div class="mt-6 border-2 w-full rounded-md py-2">
	<div class="py-2 px-4" on:click={() => (trailView = !trailView)}>
		<button type="button">
			{#if trailView}
				x Don't include trails
			{:else}
				+ Add trails
			{/if}
		</button>
	</div>

	{#if trailView}
		<div class="border-t-2">
			{#if trails}
				<div class="flex flex-col m-0">
					{#each trails as trail (trail.uid)}
						<input
							type="checkbox"
							name={trail.slug}
							id="trail-{trail.slug}"
							class="w-0 h-0 opacity-0"
						/>
						<label
							for="trail-{trail.slug}"
							class="p-2 trail-check shadow-md bg-emerald-100 rounded-md border-2 border-green-500 inline-block w-full"
							>{trail.name}</label
						>
					{/each}
				</div>
			{:else}
				<div>No trails!</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	input:checked + label.trail-check {
		@apply bg-emerald-600 text-emerald-50 border-emerald-400;
	}
</style>
