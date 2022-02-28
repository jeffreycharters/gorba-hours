<script>
	export let location;
	export let admin;
</script>

<div>
	<a
		sveltekit:prefetch
		href="/locations/{location.slug}"
		class="text-gray-600 font-semibold flex items-center border border-gray-500 px-2 py-1 rounded-md bg-slate-100 text-sm"
	>
		{#if !admin}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 mr-1"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}

		{admin ? 'Edit' : 'View'} trails
		{#if admin}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 ml-1"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
				<path
					fill-rule="evenodd"
					d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}
	</a>
</div>
