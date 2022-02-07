<script>
	import Counter from './Counter.svelte';
	let trails;
	let location;
	let trailView = false;
	let volunteers = 1;

	$: showLocationOtherField = location === 'other';

	const getLocations = async () => {
		const res = await fetch('/api/locations');
		const body = await res.json();
		return [...body.locations, { name: 'Other', slug: 'other' }];
	};
	let locations = getLocations();

	const fetchTrails = async (location) => {
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

<form>
	<div class="flex flex-col gap-3 mt-4">
		<div class="flex flex-col">
			<label for="title" class="text-lg font-bold ml-1">Title</label>
			<input
				type="text"
				id="title"
				class="border-2 py-1 px-2 rounded-md"
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
						<div class="m-4">
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
							class="border-2 border-gray-300 rounded-lg reveal-if-active"
							id="location-other"
							name="location-other"
							placeholder="Start typing to see others"
						/>
					</div>
				{/if}
			{/await}

			<Counter {volunteers} />

			<div class="mt-6">
				<label for="hours">Total person-hours:</label>
				<input
					type="number"
					id="hours"
					class="w-24 rounded-lg border-2 border-gray-300 shadow-inner-md"
				/>
			</div>

			<div class="mt-6 border-2 w-96">
				<button type="button" on:click={() => (trailView = !trailView)}>
					{#if trailView}
						Remove all trails
					{:else}
						Add trails
					{/if}
				</button>

				{#if trailView}
					<div>Choose trails:</div>
					{#if trails}
						<div class="flex">
							{#each trails as trail (trail.uid)}
								<div class="m-2">
									<input
										type="checkbox"
										name="trail.slug"
										id="trail-{trail.slug}"
										class="w-1 h-1 opacity-0"
									/>
									<label
										for="trail-{trail.slug}"
										class="p-2 trail-check shadow-md bg-emerald-100 rounded-md">{trail.name}</label
									>
								</div>
							{/each}
						</div>
					{/if}
				{/if}
			</div>
			<div class="mt-6">
				<label for="description">Description (optional):</label><br />
				<textarea class="border-2 border-gray-300 w-96 h-24 shadow-inner-md" />
			</div>
		</div>
	</div>

	<input
		type="submit"
		value="Submit Hours"
		class="border-2 border-blue-900 bg-blue-200 py-1 px-2 rounded-md"
	/>
</form>

<style lang="postcss">
	input:checked + label.location,
	input:checked + label.trail-check {
		@apply bg-emerald-600 text-emerald-50 border-emerald-400;
	}
</style>
