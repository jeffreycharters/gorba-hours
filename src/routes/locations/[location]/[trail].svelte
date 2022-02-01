<script context="module">
	export const load = async ({ fetch, params }) => {
		const res = await fetch(`api/locations/${params.location}/${params.trail}`);
		const body = await res.json();

		return {
			props: {
				locations: body.trails
			}
		};
	};
</script>

<script>
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

	const removeLocation = async (uid) => {
		const res = await fetch(`api/locations`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ uid })
		});

		if (res.ok) {
			locations = locations.filter((l) => l.uid != uid);
		}
	};
</script>

<h1>Locations!</h1>

<p>Right now there are:</p>

<ul>
	{#each locations as location (location.uid)}
		<li class="my-2">
			--> {location.name}
			<button
				on:click={() => removeLocation(location.uid)}
				class="bg-red-500 py-1 px-2 rounded-lg text-red-50 text-sm"
			>
				Delete
			</button>
		</li>
	{/each}
</ul>

<div class="font-bold mt-2">Add one:</div>

<form>
	<div class="flex flex-col w-fit">
		<label for="name">Location Name</label>
		<input
			type="text"
			id="name"
			name="name"
			placeholder="Location"
			class="border-2 py-2 px-4 w-64"
			bind:value={name}
		/>
		<input
			type="submit"
			on:click|preventDefault={addLocation}
			value="Add Location"
			class="border-2 py-2 px-4 w-64 mt-2 bg-emerald-100 border-emerald-700"
		/>
	</div>
</form>
