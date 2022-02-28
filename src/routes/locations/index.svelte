<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('api/locations');
		const body = await res.json();

		return {
			props: {
				locations: body.locations
			}
		};
	};
</script>

<script>
	import { user } from '$lib/stores';
	import TrailsButton from './components/TrailsButton.svelte';

	export let locations;

	let name = '';

	const addLocation = async () => {
		const newLocation = {
			name
		};
		const res = await fetch('api/locations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newLocation)
		});
		const body = await res.json();
		locations = [...locations, body.location];
		name = '';
	};
</script>

<div class="mx-1 sm:max-w-lg sm:mx-auto">
	<div class="border border-gray-100 shadow-inner-sm p-4 my-2 rounded-md bg-gray-50 ">
		<h1 class="text-2xl font-bold text-emerald-800">Locations</h1>

		{#if $user.admin}
			<p class="my-2 text-gray-700 bg-slate-100 border border-slate-300 p-2 rounded-md">
				<strong>Note:</strong> These never really need to be modified.
			</p>
		{/if}
	</div>

	<ul class="my-4">
		{#each locations as location (location.uid)}
			{#if location.slug !== 'other'}
				<li
					class="my-2 flex justify-between items-baseline py-2 px-4 shadow-inner-sm rounded-md bg-slate-50"
				>
					<span class="text-lg font-bold text-emerald-700">{location.name}</span>
					<TrailsButton {location} admin={$user.admin} />
				</li>
			{/if}
		{/each}
	</ul>

	{#if $user.admin}
		<div class="shadow-inner-sm rounded-md border-slate-100 border bg-slate-50 p-4">
			<div class="font-bold text-lg mb-2 text-emerald-900">Add location</div>

			<form>
				<div class="flex flex-col w-full">
					<label for="name" class="pl-2 font-semibold">Location Name</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Location"
						class="border rounded-md py-2 px-4 w-full"
						bind:value={name}
					/>
					<input
						type="submit"
						on:click|preventDefault={addLocation}
						value="Add Location"
						class="border py-2 px-4 w-full rounded-md mt-2 bg-emerald-100 border-emerald-700 text-emerald-800 font-semibold"
					/>
				</div>
			</form>
		</div>
	{/if}
</div>
