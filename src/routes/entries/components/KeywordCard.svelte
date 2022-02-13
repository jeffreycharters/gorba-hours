<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	export let keyword;

	const dispatch = createEventDispatcher();

	const toggleKeywordActive = (uid) => {
		dispatch('toggleKeywordActive', uid);
	};
	const deleteKeyword = (uid) => {
		dispatch('deleteKeyword', uid);
	};
</script>

<div
	in:fade={{ duration: 200 }}
	class="flex flex-row justify-between align-baseline m-2 border-2 border-emerald-300 py-1 px-2 rounded-md"
>
	<div class="w-5/12 font-bold text-emerald-900">{keyword.keyword}</div>

	<div class="w-5/12">
		<button
			on:click={() => toggleKeywordActive(keyword.uid)}
			class="font-bold text-slate-400 text-sm underline underline-offset-2"
		>
			{#if keyword.active}
				Deactivate
			{:else}
				Activate{/if}
		</button>
	</div>

	<div class="w-1/12 cursor-pointer">
		<button
			type="button"
			class="border-2 px-1 rounded-md border-red-700 bg-red-100 text-red-800 font-bold"
			on:click={() => deleteKeyword(keyword.uid)}>x</button
		>
	</div>
</div>
