<script>
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { elasticOut } from 'svelte/easing';
	import { crossfade, slide } from 'svelte/transition';

	export let allTrails = [];
	export let classes;

	const dispatch = createEventDispatcher();
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
		dispatch(
			'updateTrails',
			selectedTrails.map((t) => t.uid)
		);
	};

	const removeTrail = (e) => {
		const trailSlug = e.target.id;
		const targetTrail = allTrails.find((t) => t.slug === trailSlug);
		selectedTrails = selectedTrails.filter((t) => t.slug !== trailSlug);
		remainingTrails = sortArrayByValue([...remainingTrails, targetTrail], 'slug');
		dispatch(
			'updateTrails',
			selectedTrails.map((t) => t.uid)
		);
	};

	const removeNoneSelected = () => {
		document.getElementById('none-selected').style.display = 'none';
	};

	const checkNoneSelected = () => {
		const noneSelected = document.getElementById('none-selected');
		if (selectedTrails.length === 0) noneSelected.style.display = 'block';
	};
</script>

<div class={classes} transition:slide|local={{ duration: 200 }}>
	<div class="mb-4">
		<h3 class="text-lg font-bold ml-1">Trails Involved</h3>
		{#if selectedTrails.length === 0}
			<div
				class="py-2 px-4 border rounded-md whitespace-nowrap bg-slate-100 border-slate-300 shadow-sm inline-block keyword text-slate-700 w-full"
				id="none-selected"
			>
				None selected
			</div>
		{:else}
			{#each selectedTrails as trail (trail.uid)}
				<div
					animate:flip={{ duration: 400 }}
					in:receive={{ key: trail.uid }}
					out:send={{ key: trail.uid }}
					onintrostart={removeNoneSelected}
					name={trail.slug}
					id={trail.slug}
					class="my-1 py-2 px-4 border rounded-md whitespace-nowrap w-full border-emerald-900 bg-emerald-500 text-white font-semibold shadow-sm"
					on:click={removeTrail}
				>
					{trail.name}
				</div>
			{/each}
		{/if}
	</div>

	<h3 class="text-lg font-bold ml-1">Available Trails</h3>
	<div class="flex flex-col m-0">
		{#if allTrails}
			{#each remainingTrails as trail (trail.uid)}
				<div
					animate:flip={{ duration: 800, easing: elasticOut }}
					in:receive={{ key: trail.uid }}
					out:send={{ key: trail.uid }}
					onoutroend={checkNoneSelected}
					name={trail.slug}
					id={trail.slug}
					class="my-1 py-2 px-4 border rounded-md whitespace-nowrap bg-slate-100 border-slate-300 shadow-sm inline-block keyword text-slate-700 w-full"
					on:click={addTrail}
				>
					{trail.name}
				</div>
			{/each}
		{/if}
	</div>
</div>
