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
	import ToggleActive from '$lib/components/shared/ToggleActive.svelte';

	import { user } from '$lib/stores';
	import Trail from '../components/Trail.svelte';

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

	const handleActiveToggle = async (e) => {
		const res = await fetch('/api/locations/trails', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ uid: e.detail })
		});
	};
</script>

<div class="mx-1 sm:max-w-lg sm:mx-auto">
	<div
		class="shadow-inner-sm py-2 rounded-md border border-slate-100 bg-slate-50 my-2 text-emerald-800"
	>
		<h1 class="text-2xl font-bold text-center">Trails at {location.name}</h1>
	</div>
	<ul class="shadow-inner-sm pt-2 rounded-md border border-slate-100 bg-slate-50">
		{#each trails as trail (trail.uid)}
			<ToggleActive item={trail} admin={$user.admin} on:toggleActive={handleActiveToggle} />
		{/each}
	</ul>

	{#if $user.admin}
		<div class="shadow-inner-sm rounded-md border-slate-100 border bg-slate-50 p-4 mt-4">
			<div class="font-bold text-lg mb-4 text-emerald-800">Add trail</div>

			<form on:submit|preventDefault={addTrail}>
				<div class="flex flex-col w-full">
					<label for="name">Trail Name</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Cool Trail Name"
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
	{/if}
</div>
