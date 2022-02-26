<script>
	import { createEventDispatcher } from 'svelte';
	export let trail;

	const dispatch = createEventDispatcher();

	const toggleActive = () => {
		dispatch('toggleActive', { uid: trail.uid, active: trail.active });
		trail.active = !trail.active;
	};

	$: nameClasses = trail.active ? 'text-emerald-700 ' : 'text-gray-500 ';
	$: badgeClasses = trail.active
		? 'border-slate-400 text-slate-600'
		: 'border-amber-400 text-amber-600';
	$: buttonClasses = trail.active
		? 'bg-amber-100 text-amber-800 border-amber-700'
		: 'bg-cyan-100 text-cyan-800 border-cyan-700';
</script>

<li class="p-2 m-2 flex justify-between odd:bg-slate-200 rounded-md">
	<div class="flex items-baseline">
		<div class="font-bold text-lg {nameClasses}">{trail.name}</div>
		<button class="ml-2 border  px-1 text-sm  rounded-md bg-white {badgeClasses}"
			>{trail.active ? '' : 'in'}active</button
		>
	</div>
	<button on:click={toggleActive} class=" py-1 px-2 rounded-md border text-sm {buttonClasses}">
		{trail.active ? 'Inactivate' : 'Activate'}
	</button>
</li>
