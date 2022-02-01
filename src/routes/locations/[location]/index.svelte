<script context="module">
	export const load = async ({ fetch, params }) => {
		const res = await fetch(`/api/locations/${params.location}`);
		const body = await res.json();

		return {
			props: { location: body.location, trails: body.trails }
		};
	};
</script>

<script>
	export let location;
	export let trails;

	let name = '';

	const addTrail = async () => {
		const newTrail = {
			name
		};
		const res = await fetch(`/api/locations/${location.slug}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newTrail)
		});
		const body = await res.json();
		trails = [...trails, body.trail];
		name = '';
	};

	const removeTrail = async (uid) => {
		const res = await fetch(`/api/locations/trails`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ uid })
		});

		if (res.ok) {
			trails = trails.filter((t) => t.uid != uid);
		}
	};
</script>

<h1>Trails at <strong>{location.name}</strong>!</h1>

<p>Right now there are:</p>

<ul>
	{#each trails as trail (trail.uid)}
		<li class="my-2">
			--> {trail.name}
			<button
				on:click={() => removeTrail(trail.uid)}
				class="bg-red-500 py-1 px-2 rounded-lg text-red-50 text-sm"
			>
				Delete
			</button>
		</li>
	{/each}
</ul>

<div class="font-bold mt-2">Add one:</div>

<form on:submit|preventDefault={addTrail}>
	<div class="flex flex-col w-fit">
		<label for="name">Trail Name</label>
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
			value="Add Trail"
			class="border-2 py-2 px-4 w-64 mt-2 bg-emerald-100 border-emerald-700"
		/>
	</div>
</form>
