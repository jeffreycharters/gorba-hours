<script>
	import { flip } from 'svelte/animate';
	import { crossfade, fade } from 'svelte/transition';

	export let allTrails = [];
	let selectedTrails = [];

	let animationDuration = 600;

	const [send, receive] = crossfade({
		duration: animationDuration
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

	const removeNoneSelected = () => {
		document.getElementById('none-selected').style.display = 'none';
	};

	const checkNoneSelected = () => {
		const noneSelected = document.getElementById('none-selected');
		if (selectedTrails.length === 0) noneSelected.style.display = 'block';
	};
</script>

<div class="mt-6 px-2 border-2 w-full rounded-md">
	<h3 class="text-lg font-bold ml-1">Trails Involved</h3>
	{#if selectedTrails.length === 0}
		<div
			class="w-full bg-slate-100 my-1 p-2 rounded-md text-slate-600 border-2 border-slate-200"
			id="none-selected"
		>
			None selected
		</div>
	{:else}
		{#each selectedTrails as trail (trail.uid)}
			<div
				animate:flip
				in:receive={{ key: trail.uid }}
				out:send={{ key: trail.uid }}
				onintrostart={removeNoneSelected}
				name={trail.slug}
				id={trail.slug}
				class="w-full my-1 p-2 border-2 rounded-md border-emerald-900 bg-emerald-500 text-white font-bold"
				on:click={removeTrail}
			>
				{trail.name}
			</div>
		{/each}
	{/if}

	<h3 class="text-lg font-bold ml-1">Available Trails</h3>
	<div class="flex flex-col m-0">
		{#if allTrails}
			{#each remainingTrails as trail (trail.uid)}
				<div
					animate:flip={{ duration: 800 }}
					in:receive={{ key: trail.uid }}
					out:send={{ key: trail.uid }}
					onoutroend={checkNoneSelected}
					name={trail.slug}
					id={trail.slug}
					class="w-full bg-slate-50 my-1 p-2 border-2 border-slate-200 rounded-md text-slate-600"
					on:click={addTrail}
				>
					{trail.name}
				</div>
			{/each}
		{/if}
	</div>
</div>
