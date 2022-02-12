<script>
	import { createEventDispatcher } from 'svelte';
	export let count;
	export let max = Infinity;
	export let min = -Infinity;
	export let steps = [1];

	const dispatch = createEventDispatcher();

	steps.reverse();

	const decrement = (amount) => {
		if (count - amount >= min) {
			count -= amount;
			dispatch('updateCount', count);
		}
	};

	const increment = (amount) => {
		if (count - amount <= max) {
			count += amount;
			dispatch('updateCount', count);
		}
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
		bind:value={count}
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
