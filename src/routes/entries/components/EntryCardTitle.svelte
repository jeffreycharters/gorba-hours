<script>
	export let entry;

	const dbDate = new Date(entry.date);
	const timezoneOffset = dbDate.getTimezoneOffset() * 60 * 1000;
	const entryDate = new Date(dbDate.getTime() + timezoneOffset);
	const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
</script>

<div class="text-2xl font-bold text-emerald-600 tracking-wide">
	{entry.title}
</div>
<div class="font-bold text-md text-emerald-700 border-b-2 border-b-gray-300 mt-1">
	{entryDate.toLocaleDateString('en-CA', dateOptions)}
</div>
