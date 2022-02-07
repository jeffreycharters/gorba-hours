<script>
	export let volunteers;

	const decrement = () => {
		if (volunteers > 1) --volunteers;
	};

	const increment = () => {
		++volunteers;
	};
</script>

<div class="mt-6 flex flex-col">
	<label for="volunteers">Number of volunteers present:</label>
	<div class="flex flex-row gap-4 mx-auto mt-3">
		<button
			class="text-2xl border-2 border-gray-300 pt-0 pb-2 px-3 align-baseline rounded-md"
			on:click={decrement}>-</button
		>
		<input
			type="number"
			bind:value={volunteers}
			id="volunteers"
			class="w-16 rounded-lg border-2 border-gray-300 shadow-inner-md p-2 text-center"
		/>
		<button
			class="text-2xl border-2 border-gray-300 pt-0 pb-2 px-3 align-baseline rounded-md"
			on:click={increment}>+</button
		>
	</div>
</div>
