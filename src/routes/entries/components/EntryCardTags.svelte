<script>
	export let entry;

	const titleCase = (string) => {
		return string
			.toLowerCase()
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};
</script>

<div class="flex flex-row flex-wrap justify-end">
	{#each entry.keywords as k (k.uid)}
		<div class="flex flex-row flex-nowrap text-sm justify-start items-center">
			<img src="/images/icon-tag.svg" class="h-3" alt="keyword tag" />
			<a href="/keywords/{k.keyword}" class="pr-2 underline">{titleCase(k.keyword)}</a>
		</div>
	{/each}
</div>
