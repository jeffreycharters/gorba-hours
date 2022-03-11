<script>
	import { fade } from 'svelte/transition';
	export let errors;
</script>

{#if errors}
	<div>
		<ul class="px-6 my-1 text-sm text-red-600 font-semibold" transition:fade>
			{#each errors as error}
				<li class="pl-2 list-['→']">{error.message}</li>
			{/each}
		</ul>
	</div>
{/if}
