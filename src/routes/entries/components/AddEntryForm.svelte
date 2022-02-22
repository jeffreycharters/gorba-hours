<script>
	import { slide } from 'svelte/transition';
	import Counter from './Counter.svelte';
	import TrailSelector from './TrailSelector.svelte';
	import TagSelector from './TagSelector.svelte';
	import log from 'tailwindcss/lib/util/log';

	export let user;

	let allTrails;

	const form = {
		user: user.email,
		title: 'Testing',
		date: '2022-02-21',
		location: '',
		volunteers: 1,
		hours: 1,
		otherLocation: '',
		description: '',
		trails: [],
		tags: []
	};

	$: showLocationOtherField = form.location === 'other';

	const getLocations = async () => {
		const res = await fetch('/api/locations');
		const body = await res.json();

		return body.locations;
	};
	let locations = getLocations();

	const getKeywords = async () => {
		const res = await fetch('/api/entries/keywords');
		const body = await res.json();
		return body.keywords;
	};
	let allKeywords = getKeywords();

	const fetchTrails = async (location) => {
		if (location === 'other') {
			allTrails = [];
			return;
		}
		const res = await fetch(`/api/locations/${location}`);
		const body = await res.json();

		allTrails = body.trails;
	};

	const formatCurrentDate = (dateObj) => {
		const year = dateObj.getFullYear();
		const month = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth();
		const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
		return `${year}-${month}-${day}`;
	};

	let date = formatCurrentDate(new Date());

	const submitEntry = async () => {
		const res = await fetch('/api/entries', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ form })
		});
	};
</script>

<h1 class="text-2xl font-bold mx-2">Log Volunteer Hours</h1>

<form class="w-11/12 my-2 mx-auto" method="post" on:submit|preventDefault={submitEntry}>
	<div class="flex flex-col gap-3 mt-4">
		<div class="flex flex-col">
			<label for="title" class="text-lg font-bold ml-1">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				class="border-2 py-1 px-2 rounded-md w-full"
				placeholder="Short Description"
				bind:value={form.title}
			/>
		</div>
		<div class="flex flex-col">
			<label for="date" class="text-lg font-bold ml-1">Date</label>
			<input type="date" bind:value={form.date} class="border-2 py-1 px-2 rounded-md" id="date" />
		</div>
		<div class="mt-6">
			<div class="text-lg font-bold ml-1">Location</div>
			{#await locations}
				<div>Awaiting locations..</div>
			{:then locs}
				<div class="flex fex-row justify-evenly items-baseline gap-1">
					{#each locs as loc (loc.uid)}
						<div class="my-2 inline-block">
							<input
								type="radio"
								name="location"
								id={loc.name}
								value={loc.uid}
								class="opacity-0 w-1 h-1"
								bind:group={form.location}
								on:change={() => fetchTrails(loc.slug)}
							/>
							<label class="py-2 px-4 border-2 rounded-md whitespace-nowrap location" for={loc.name}
								>{loc.name}</label
							>
						</div>
					{/each}
				</div>

				{#if showLocationOtherField}
					<div transition:slide={{ duration: 200 }} class="mt-2 mx-auto w-fit">
						Specify location <span class="text-gray-400">(optional)</span>:
						<div class="autocomplete">
							<input
								type="text"
								class="border-2 border-gray-300 rounded-md reveal-if-active"
								id="location-other"
								name="location-other"
								placeholder="Start typing to see others"
								bind:value={form.otherLocation}
							/>
						</div>
					</div>
				{:else}
					<div />
				{/if}
			{/await}

			<div class="mt-6 flex flex-col">
				<label for="volunteers" class="text-lg font-bold ml-1">Volunteer Count</label>
				<div class="ml-2 text-sm">Total number of volunteers involved.</div>

				<Counter
					count={form.volunteers}
					min="1"
					steps={[1]}
					on:updateCount={(e) => {
						form.volunteers = e.detail;
					}}
				/>
			</div>

			<div class="flex flex-col mt-6">
				<label for="hours" class="text-lg font-bold ml-1">Volunteer Hours</label>
				<div class="text-sm ml-2">Total volunteer-hours worked.</div>
				<Counter
					count={form.hours}
					min="0.25"
					steps={[0.5, 2]}
					on:updateCount={(e) => {
						form.hours = e.detail;
					}}
				/>
			</div>

			{#if form.location != 'other' && form.location != ''}
				<TrailSelector {allTrails} on:updateTrails={(e) => (form.trails = e.detail)} />
			{/if}

			<TagSelector {allKeywords} on:updateTags={(e) => (form.tags = e.detail)} />

			<div class="mt-6">
				<label for="description" class="text-lg font-bold ml-1">Description</label> (optional)
				<textarea
					class="border-2 border-gray-300 w-full h-24 rounded-md mx-auto"
					placeholder="For future reference."
					bind:value={form.description}
				/>
			</div>
		</div>
	</div>

	<input
		type="submit"
		value="Save Entry"
		class="border-2 border-emerald-600 bg-emerald-100 py-1 px-2 rounded-md text-emerald-700 mt-6 w-full mx-auto font-bold"
	/>
</form>

<style lang="postcss">
	input:checked + label.location {
		@apply bg-emerald-500 text-white border-emerald-900;
	}
</style>
