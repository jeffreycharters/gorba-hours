<script>
	import { createEventDispatcher } from 'svelte';

	export let allKeywords;
	export let classes;
	let selectedKeywords = [];

	const dispatch = createEventDispatcher();

	const handleChange = () => {
		dispatch('updateTags', selectedKeywords);
	};
</script>

<div class={classes}>
	<h3 class="text-lg font-bold ml-1">Add tags</h3>

	<p class="text-sm mt-2 mb-4 px-2">
		These will help us group data, please take a second and tap/click the relevant keywords.
	</p>

	{#await allKeywords}
		<div>Awaiting Keywords...</div>
	{:then keywords}
		<div class="flex flex-row flex-wrap gap-2 justify-center">
			{#each keywords as keyword (keyword.uid)}
				<div>
					<input
						type="checkbox"
						bind:group={selectedKeywords}
						class="w-0 h-0 opacity-0"
						id="keyword-{keyword.uid}"
						value={keyword.uid}
						on:change={handleChange}
					/>
					<label
						for="keyword-{keyword.uid}"
						class="text-sm py-1 px-4 border rounded-md whitespace-nowrap location bg-slate-100 border-slate-300 shadow-sm inline-block keyword text-slate-700"
						>{keyword.keyword}</label
					>
				</div>
			{/each}
		</div>
	{/await}
</div>

<style lang="postcss">
	input:checked + label.keyword {
		@apply bg-emerald-500 text-white border-emerald-900;
	}
</style>
