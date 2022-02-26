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

<div class="flex flex-row gap-2 mx-auto mt-3 items-center">
	{#each steps as step}
		<button
			type="button"
			class="text-xs border border-gray-300 w-12 h-9 align-baseline rounded-md"
			on:click={() => decrement(step)}>-{step}</button
		>
	{/each}
	<input
		type="number"
		bind:value={count}
		id="volunteers"
		class="w-12 rounded-lg border border-emerald-500 p-2 text-center bg-gray-50 font-bold text-emerald-700"
		step={Math.min(...steps)}
	/>
	{#each steps.reverse() as step}
		<button
			type="button"
			class="text-xs border border-gray-300 w-12 h-9 align-baseline rounded-md"
			on:click={() => increment(step)}>+{step}</button
		>
	{/each}
</div>
