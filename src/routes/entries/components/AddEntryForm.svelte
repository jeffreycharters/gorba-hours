<script>
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import Counter from './Counter.svelte';
	import TrailSelector from './TrailSelector.svelte';
	import TagSelector from './TagSelector.svelte';

	export let user;

	let allTrails;
	let showLocationOtherField = false;
	let otherLocations = [];

	const form = {
		user: user.email,
		title: '',
		date: '',
		location: '',
		volunteers: 1,
		hours: 1,
		otherLocation: '',
		description: '',
		trails: [],
		tags: []
	};

	$: if (new Date(form.date) > new Date()) form.date = formatDate(new Date());

	const fetchOtherLocations = async () => {
		const res = await fetch('/api/locations/other');
		const body = await res.json();
		return body.otherLocations;
	};

	const getLocations = async () => {
		const res = await fetch('/api/locations');
		const body = await res.json();
		return body.locations;
	};
	let locations = getLocations();

	const fetchKeywords = async () => {
		const res = await fetch('/api/entries/keywords');
		const body = await res.json();
		return body.keywords.filter((k) => k.active == true);
	};
	let allKeywords = fetchKeywords();

	const fetchTrails = async (location) => {
		if (location === 'other') {
			allTrails = [];
			showLocationOtherField = true;
			if (otherLocations.length === 0) {
				const fetchedLocations = await fetchOtherLocations();
				otherLocations = fetchedLocations.map((l) => l.other_location);
			}
			return true;
		}
		const res = await fetch(`/api/locations/${location}`);
		const body = await res.json();
		showLocationOtherField = false;
		allTrails = body.trails.filter((t) => t.active === true);
	};

	const formatDate = (dateObj) => {
		const year = dateObj.getFullYear();
		const month = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth();
		const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
		return `${year}-${month}-${day}`;
	};

	form.date = formatDate(new Date());

	const submitEntry = async () => {
		const res = await fetch('/api/entries', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ form })
		});
		if (res.ok) {
			goto('/entries/list');
		}
	};

	const search = (string) => {
		let results = [];
		const val = string.toLowerCase();

		for (let i = 0; i < otherLocations.length; i++) {
			if (otherLocations[i].toLowerCase().indexOf(val) > -1) {
				results.push(otherLocations[i]);
			}
		}

		return results;
	};

	const searchHandler = (e) => {
		const inputVal = e.currentTarget.value;
		let results = [];
		if (inputVal.length > 0) {
			results = search(inputVal);
		}
		showSuggestions(results, inputVal);
	};

	const showSuggestions = (results, inputVal) => {
		const suggestions = document.querySelector('.suggestions ul');
		suggestions.innerHTML = '';

		if (results.length > 0) {
			for (let i = 0; i < results.length; i++) {
				let item = results[i];
				const match = item.match(new RegExp(inputVal, 'i'));
				item = item.replace(match[0], `<strong>${match[0]}</strong>`);
				suggestions.innerHTML += `<li class="text-emerald-600 py-1 my-1 px-4 hover:bg-slate-200 rounded-md border">${item}</li>`;
			}
			suggestions.classList.add('has-suggestions');
		} else {
			results = [];
			suggestions.innerHTML = '';
			suggestions.classList.remove('has-suggestions');
		}
	};

	const useSuggestion = (e) => {
		const suggestions = document.querySelector('.suggestions ul');
		const input = document.getElementById('location-other');
		input.value = e.target.innerText;
		input.focus();
		suggestions.innerHTML = '';
		suggestions.classList.remove('has-suggestions');
	};

	const titleClass = 'text-lg font-bold ml-2 text-slate-700 tracking-wide';
	const sectionClass = 'my-2 p-2 shadow-inner-sm rounded-md border-slate-200 border bg-slate-50';
</script>

<div class="m-1 sm:max-w-lg sm:mx-auto">
	<h1
		class="text-2xl font-bold p-2 shadow-inner-sm bg-slate-50 rounded-md text-center text-emerald-700 border-slate-200 border"
	>
		Log Volunteer Hours
	</h1>

	<form
		class="w-full my-2 mx-auto"
		method="post"
		on:submit|preventDefault={submitEntry}
		autocomplete="off"
	>
		<div class="flex flex-col gap-3">
			<div class="flex flex-col {sectionClass}">
				<label for="title" class={titleClass}>Title</label>
				<input
					type="text"
					name="title"
					id="title"
					class="border py-1 px-2 rounded-md w-full"
					placeholder="Short Description"
					bind:value={form.title}
				/>
			</div>

			<div class="flex justify-start gap-4 items-center {sectionClass}">
				<label for="date" class={titleClass}>Date</label>
				<input type="date" bind:value={form.date} class="border py-1 px-2 rounded-md" id="date" />
			</div>
			<div class={sectionClass}>
				<div class={titleClass}>Location</div>
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
									value={loc.slug}
									class="opacity-0 w-1 h-1"
									bind:group={form.location}
									on:change={() => fetchTrails(loc.slug)}
								/>
								<label
									class="py-1 px-4 border rounded-md whitespace-nowrap location bg-slate-100 border-slate-300 shadow-sm text-slate-700 font-semibold"
									for={loc.name}>{loc.name}</label
								>
							</div>
						{/each}
					</div>

					{#if showLocationOtherField}
						<div transition:slide|local={{ duration: 200 }} class="mt-2 w-full">
							Specify location <span class="text-gray-400">(optional)</span>:
							<div class="autocomplete">
								<input
									type="text"
									class="w-full border border-gray-300 rounded-md reveal-if-active bg-gray-50"
									id="location-other"
									name="location-other"
									placeholder="Start typing to see others"
									bind:value={form.otherLocation}
									on:keyup={searchHandler}
								/>
								<div class="suggestions relative w-full">
									<ul on:click={useSuggestion} class="u-list absolute bg-white w-full opacity-95" />
								</div>
							</div>
						</div>
					{:else}
						<div />
					{/if}
				{/await}
			</div>

			<div class="flex flex-col {sectionClass}">
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

			<div class="flex flex-col {sectionClass}">
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

			{#if form.location != '' && form.location != 'other'}
				<TrailSelector
					{allTrails}
					on:updateTrails={(e) => (form.trails = e.detail)}
					classes={sectionClass}
				/>
			{/if}

			<TagSelector
				{allKeywords}
				on:updateTags={(e) => (form.tags = e.detail)}
				classes={sectionClass}
			/>

			<div class={sectionClass}>
				<div class="mb-2">
					<label for="description" class="text-lg font-bold ml-1">Description</label> (optional)
				</div>
				<textarea
					class="border border-slate-400 w-full h-28 rounded-md mx-auto shadow-sm"
					placeholder="For future reference."
					bind:value={form.description}
				/>
			</div>
		</div>

		<input
			type="submit"
			value="Save Entry"
			class="border border-emerald-600 bg-emerald-100 py-1 px-2 rounded-md text-emerald-700 mt-4 w-full mx-auto font-semibold shadow-md"
		/>
	</form>
</div>

<style lang="postcss">
	input:checked + label.location {
		@apply bg-emerald-500 text-white border-emerald-900;
	}
</style>
