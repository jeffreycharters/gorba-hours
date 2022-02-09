<script>
	export let counting;
	export let max = Infinity;
	export let min = -Infinity;
	export let steps = [1];

	steps.reverse();

	const decrement = (amount) => {
		if (counting - amount > min) counting -= amount;
	};

	const increment = (amount) => {
		if (counting - amount < max) counting += amount;
	};
</script>

<div class="flex flex-row gap-2 mx-auto mt-3">
	{#each steps as step}
		<button
			type="button"
			class="text-xs border-2 border-gray-300 px-3 align-baseline rounded-md"
			on:click={() => decrement(step)}>-{step}</button
		>
	{/each}
	<input
		type="number"
		value={counting}
		id="volunteers"
		class="w-16 rounded-lg border-2 border-gray-300 p-2 text-center"
		step={Math.min(...steps)}
	/>
	{#each steps.reverse() as step}
		<button
			type="button"
			class="text-xs border-2 border-gray-300 px-3 align-baseline rounded-md"
			on:click={() => increment(step)}>+{step}</button
		>
	{/each}
</div>
