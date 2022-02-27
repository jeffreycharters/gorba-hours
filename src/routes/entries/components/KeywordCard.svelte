<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	export let keyword;

	const dispatch = createEventDispatcher();

	const toggleKeywordActive = (uid) => {
		dispatch('toggleKeywordActive', uid);
	};
</script>

<div
	in:fade={{ duration: 200 }}
	class="flex flex-row justify-between items-center border border-emerald-500 py-1 px-2 rounded-md"
>
	<div class="font-bold text-emerald-900">{keyword.keyword}</div>

	<div>
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
</div>
