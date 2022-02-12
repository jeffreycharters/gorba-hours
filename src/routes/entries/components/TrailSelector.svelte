<script>
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';

	export let allTrails = [];
	let selectedTrails = [];

	const [send, receive] = crossfade({
		duration: 500
	});

	const sortArrayByValue = (array, value) => {
		return array.sort((a, b) => (a[value] > b[value] ? 1 : -1));
	};

	$: remainingTrails = sortArrayByValue(allTrails, 'slug');
	$: if (allTrails === remainingTrails) {
		selectedTrails = [];
	}

	const addTrail = (e) => {
		const trailSlug = e.target.id;
		const targetTrail = allTrails.find((t) => t.slug === trailSlug);
		remainingTrails = remainingTrails.filter((t) => t.slug !== trailSlug);
		selectedTrails = sortArrayByValue([...selectedTrails, targetTrail], 'slug');
	};

	const removeTrail = (e) => {
		const trailSlug = e.target.id;
		const targetTrail = allTrails.find((t) => t.slug === trailSlug);
		selectedTrails = selectedTrails.filter((t) => t.slug !== trailSlug);
		remainingTrails = sortArrayByValue([...remainingTrails, targetTrail], 'slug');
	};
</script>

<div class="mt-6 px-2 border-2 w-full rounded-md">
	<h3 class="text-lg font-bold ml-1">Trails Involved</h3>
	{#if selectedTrails.length === 0}
		<div class="w-full bg-slate-200 my-1 p-2">None selected</div>
	{:else}
		{#each selectedTrails as trail (trail.uid)}
			<div
				animate:flip
				in:receive={{ key: trail.uid }}
				out:send={{ key: trail.uid }}
				name={trail.slug}
				id={trail.slug}
				class="w-full my-1 p-2 border-2 rounded-md border-emerald-900 bg-emerald-500 text-emerald-50 font-bold"
				on:click={removeTrail}
			>
				{trail.name}
			</div>
		{/each}
	{/if}

	<h3 class="text-lg font-bold ml-1">Other Trails</h3>
	<div class="flex flex-col m-0">
		{#if allTrails}
			{#each remainingTrails as trail (trail.uid)}
				<div
					animate:flip
					in:receive={{ key: trail.uid }}
					out:send={{ key: trail.uid }}
					name={trail.slug}
					id={trail.slug}
					class="w-full bg-slate-200 my-1 p-2 border-2 rounded-md"
					on:click={addTrail}
				>
					{trail.name}
				</div>
			{/each}
		{/if}
	</div>
</div>
