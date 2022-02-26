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
	let disabled = true;

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

	const removeLocation = async () => {
		const res = await fetch(`/api/locations`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ uid: location.uid })
		});

		if (res.ok) {
			console.log('now what?');
		}
	};

	const nameHandler = (e) => {
		disabled = e.target.value === location.name ? false : true;
	};
</script>

<div class="sm:max-w-lg sm:mx-auto">
	<div
		class="shadow-inner-sm py-2 rounded-md border border-slate-100 bg-slate-50 my-2 text-emerald-800"
	>
		<h1 class="text-2xl font-bold text-center">Trails at {location.name}</h1>
	</div>
	<ul class="shadow-inner-sm py-2 rounded-md border border-slate-100 bg-slate-50">
		{#each trails as trail, i (trail.uid)}
			<li class="p-2 m-2 flex justify-between {i % 2 === 0 ? 'bg-slate-100' : ''} rounded-md">
				<div class="flex items-center">
					<div class="font-bold text-emerald-800 text-lg">{trail.name}</div>
					<button
						class="ml-2 border border-slate-400 px-1 text-sm text-slate-600 bg-white rounded-md"
						>active</button
					>
				</div>
				<button
					on:click={() => removeTrail(trail.uid)}
					class="bg-amber-100 py-1 px-2 rounded-md text-amber-800 text-sm border-amber-700 border"
				>
					Inactivate
				</button>
			</li>
		{/each}
	</ul>

	<div class="shadow-inner-sm rounded-md border-slate-100 border bg-slate-50 p-4 mt-4">
		<div class="font-bold text-lg mb-4 text-emerald-800">Add trail</div>

		<form on:submit|preventDefault={addTrail}>
			<div class="flex flex-col w-full">
				<label for="name">Trail Name</label>
				<input
					type="text"
					id="name"
					name="name"
					placeholder="Location"
					class="border py-2 px-4 w-full rounded-md"
					bind:value={name}
				/>
				<input
					type="submit"
					value="Add Trail"
					class="border py-2 px-4 w-full rounded-md mt-2 bg-emerald-100 border-emerald-700 text-emerald-800 font-semibold"
				/>
			</div>
		</form>
	</div>

	<div class="shadow-inner-sm py-2 rounded-md border border-slate-100 bg-slate-50 my-2 p-4">
		<h1 class="text-red-700 font-bold">Danger zone:</h1>

		<p class="px-8 my-4 text-sm">
			To inactivate {location.name}, type <code class="font-bold">{location.name}</code> into the
			box below and click "Inactivate {location.name}".
		</p>

		<div class="w-full text-center">
			<input
				type="text"
				placeholder={location.name}
				class="w-9/12 rounded-md p-1 mx-auto"
				on:keyup={nameHandler}
			/>
			<button
				on:click={removeLocation}
				class="bg-red-500 p-2 rounded-lg text-red-50 text-sm my-2 w-9/12 disabled:bg-red-100 disabled:text-red-400 transition-colors"
				{disabled}>Inactivate {location.name}</button
			>
		</div>
	</div>
</div>
