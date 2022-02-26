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
		<h1 class="text-2xl font-bold mb-4 text-emerald-800">Locations</h1>

		<p class="my-2 text-gray-700">
			<strong>Note:</strong> These never really need to be modified.
		</p>
	</div>

	<ul class="my-4">
		{#each locations as location (location.uid)}
			<li
				class="my-2 flex justify-between items-center py-2 px-4 shadow-inner-sm rounded-md bg-slate-50"
			>
				<span class="text-lg font-bold text-emerald-700">{location.name}</span>
				<div>
					<a
						href="locations/{location.slug}"
						class="text-gray-500 font-semibold flex items-center border border-gray-500 px-2 py-1 rounded-md bg-slate-100 text-sm"
						>Edit trails
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 ml-1"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
							/>
							<path
								fill-rule="evenodd"
								d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</li>
		{/each}
	</ul>

	<div class="shadow-inner-sm rounded-md border-slate-100 border bg-slate-50 p-4">
		<div class="font-bold mt-2 text-lg mb-4">Add location</div>

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
</div>
