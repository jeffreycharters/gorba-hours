<script>
	export let allKeywords;
	let selectedKeywords = [];
	$: console.log(selectedKeywords);
</script>

<div class="mt-6 px-2 border-2 w-full rounded-md">
	<h3 class="text-lg font-bold ml-1">Add tags</h3>

	<p class="text-sm">
		These will help us group data, please take a second and tap/click the relevant keywords.
	</p>

	{#await allKeywords}
		<div>Awaiting Keywords...</div>
	{:then keywords}
		<div class="flex floex-row flex-wrap">
			{#each keywords as keyword (keyword.uid)}
				<div>
					<input
						type="checkbox"
						bind:group={selectedKeywords}
						class="w-0 h-0 opacity-0"
						id="keyword-{keyword.uid}"
						value={keyword.uid}
					/>
					<label
						for="keyword-{keyword.uid}"
						class="border-2 border-slate-200 bg-slate-50 text-slate-600 m-1 py-1 px-2 rounded-md keyword inline-block"
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
