<script>
	import { createEventDispatcher } from 'svelte';
	export let item;
	export let admin;

	const dispatch = createEventDispatcher();

	const toggleActive = () => {
		dispatch('toggleActive', item.uid);
		item.active = !item.active;
	};

	$: nameClasses = item.active ? 'text-emerald-700 ' : 'text-gray-500 ';
	$: badgeClasses = item.active
		? 'border-slate-400 text-slate-600'
		: 'border-amber-400 text-amber-600';
	$: buttonClasses = item.active
		? 'bg-amber-100 text-amber-800 border-amber-700'
		: 'bg-cyan-100 text-cyan-800 border-cyan-700';
</script>

<li class="p-2 mx-1 flex justify-between odd:bg-slate-200 rounded-md">
	<div class="flex items-baseline">
		<div class="font-bold text-lg {nameClasses}">{item.name || item.keyword}</div>
		<button class="ml-2 border  px-1 text-sm  rounded-md bg-white {badgeClasses}"
			>{item.active ? '' : 'in'}active</button
		>
	</div>
	{#if admin}
		<button on:click={toggleActive} class=" py-1 px-2 rounded-md border text-sm {buttonClasses}">
			{item.active ? 'Inactivate' : 'Activate'}
		</button>
	{/if}
</li>
