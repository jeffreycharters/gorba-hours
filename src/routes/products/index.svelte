<script context="module">
	export const load = async ({ fetch }) => {
		const currentYear = new Date().getFullYear();
		const res = await fetch(`/api/products/${currentYear}`);
		const body = await res.json();
		return {
			props: {
				details: body.details,
				currentYear
			}
		};
	};
</script>

<script>
	export let details;
	export let currentYear;
</script>

<div class="w-auto m-2 sm:max-w-lg sm:mx-auto">
	<div
		class="text-2xl font-bold p-2 shadow-inner-sm bg-gray-100 rounded-md text-center text-emerald-700 border-slate-200 border"
	>
		Output Products
	</div>

	<div
		class="my-2 p-2 shadow-inner-sm bg-gray-100 rounded-md text-center text-emerald-900 border-slate-200 border"
	>
		<span>{currentYear} total: </span>
		{details._sum.hours} hour{details._sum.hours === '1' ? '' : 's'}
	</div>
</div>
