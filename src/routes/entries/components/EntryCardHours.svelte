<script>
	export let entry;

	const pluralize = (number) => {
		return number === 1 ? '' : 's';
	};
</script>

<div class="flex min-w-full justify-between mt-4 mb-2">
	<div class="flex text-gray-600 font-bold pr-2 text-sm items-center">
		<img src="/images/icon-user.svg" alt="user icon" class="h-4 mr-1 fill-gray-500" />{entry.owner
			.username}
	</div>
	<div class="flex text-gray-600 font-bold pr-2 text-sm items-center">
		<img
			src="/images/icon-users.svg"
			alt="user icon"
			class="h-4 mr-1 fill-gray-500"
		/>{entry.volunteers} vol{pluralize(entry.volunteers)}
	</div>
	<div class="flex text-gray-600 font-bold pr-2 text-sm items-center">
		<img src="/images/icon-clock.svg" alt="user icon" class="h-4 mr-1" />{entry.hours} hr{pluralize(
			entry.hours
		)}
	</div>
</div>
