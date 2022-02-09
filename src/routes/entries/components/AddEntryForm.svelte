<script>
	import Counter from './Counter.svelte';
	import TrailSelector from './TrailSelector.svelte';
	let trails;
	let location = '';
	let trailView = false;
	let volunteers = 1;
	let hours = 1;

	$: showLocationOtherField = location === 'other';

	const getLocations = async () => {
		const res = await fetch('/api/locations');
		const body = await res.json();
		return [...body.locations, { name: 'Other', slug: 'other' }];
	};
	let locations = getLocations();

	const fetchTrails = async (location) => {
		if (location === 'other') {
			trails = [];
			return;
		}
		const res = await fetch(`/api/locations/${location}`);
		const body = await res.json();

		trails = body.trails;
	};

	const formatCurrentDate = (dateObj) => {
		const year = dateObj.getFullYear();
		const month = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth();
		const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
		return `${year}-${month}-${day}`;
	};

	const today = formatCurrentDate(new Date());
</script>

<h1 class="text-2xl font-bold">Log Volunteer Hours</h1>

<form class="w-11/12 mx-auto">
	<div class="flex flex-col gap-3 mt-4">
		<div class="flex flex-col">
			<label for="title" class="text-lg font-bold ml-1">Title</label>
			<input
				type="text"
				id="title"
				class="border-2 py-1 px-2 rounded-md w-full"
				placeholder="Short Description"
			/>
		</div>
		<div class="flex flex-col">
			<label for="date" class="text-lg font-bold ml-1">Date</label>
			<input type="date" value={today} class="border-2 py-1 px-2 rounded-md" id="date" />
		</div>
		<div class="mt-6">
			<div class="text-lg font-bold ml-1">Location</div>
			{#await locations}
				<div>Awaiting locations..</div>
			{:then locs}
				<div class="flex justify-start items-baseline">
					{#each locs as loc (loc.uid)}
						<div class="m-2">
							<input
								type="radio"
								name="location"
								id={loc.name}
								value={loc.slug}
								class="opacity-0 w-1 h-1"
								bind:group={location}
								on:change={() => fetchTrails(loc.slug)}
							/>
							<label
								class="py-1 px-3 border-2 rounded-md  whitespace-nowrap location"
								for={loc.name}>{loc.name}</label
							>
						</div>
					{/each}
				</div>

				{#if showLocationOtherField}
					<div>
						Enter the location or choose from existing (optional):
						<input
							type="text"
							class="border-2 border-gray-300 rounded-md reveal-if-active"
							id="location-other"
							name="location-other"
							placeholder="Start typing to see others"
						/>
					</div>
				{/if}
			{/await}

			<div class="mt-6 flex flex-col">
				<label for="volunteers" class="text-lg font-bold ml-1">Volunteer Count</label>
				<div class="ml-2 text-sm">Total number of people involved.</div>

				<Counter counting={volunteers} min="1" steps={[1]} />
			</div>

			<div class="flex flex-col mt-6">
				<label for="hours" class="text-lg font-bold ml-1">Person-hours</label>
				<div class="text-sm ml-2">Total person-hours worked.</div>
				<Counter counting={hours} min="0.25" steps={[0.5, 2]} />
			</div>

			{#if location != 'other' && location != ''}
				<TrailSelector {trailView} {trails} />
			{/if}

			<div class="mt-6">
				<label for="description" class="text-lg font-bold ml-1">Description</label> (optional)
				<textarea
					class="border-2 border-gray-300 w-11/12 h-24 rounded-md mx-auto"
					placeholder="For future reference."
				/>
			</div>
		</div>
	</div>

	<input
		type="submit"
		value="Save Entry"
		class="border-2 border-emerald-300 bg-emerald-100 py-1 px-2 rounded-md text-emerald-800 mt-6 w-11/12 mx-auto"
	/>
</form>

<style lang="postcss">
	input:checked + label.location {
		@apply bg-emerald-600 text-emerald-50 border-emerald-400;
	}
</style>
