<script>
	export let entry;

	const dbDate = new Date(entry.date);
	const timezoneOffset = dbDate.getTimezoneOffset() * 60 * 1000;
	const entryDate = new Date(dbDate.getTime() + timezoneOffset);
	const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	const pluralize = (number) => {
		return number === 1 ? '' : 's';
	};

	const titleCase = (string) => {
		return string
			.toLowerCase()
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};
</script>

<div class="flex flex-col m-1 p-2 shadow rounded-md my-4">
	<div class="text-2xl font-bold text-gray-500 tracking-wide">
		{entry.title}
	</div>
	<div class="font-bold text-md text-emerald-700 border-b-2 border-b-gray-200">
		{entryDate.toLocaleDateString('en-CA', dateOptions)}
	</div>
	<div class="flex min-w-full justify-between mt-4">
		<div class="flex text-gray-400 font-bold pr-2 text-sm items-center">
			<img src="/images/icon-user.svg" alt="user icon" class="h-4 mr-1" />{entry.owner.username}
		</div>
		<div class="flex text-gray-400 font-bold pr-2 text-sm items-center">
			<img src="/images/icon-users.svg" alt="user icon" class="h-5 mr-1" />{entry.volunteers} vol{pluralize(
				entry.volunteers
			)}
		</div>
		<div class="flex text-gray-400 font-bold pr-2 text-sm items-center">
			<img src="/images/icon-clock.svg" alt="user icon" class="h-5 mr-1" />{entry.hours} hr{pluralize(
				entry.hours
			)}
		</div>
	</div>

	<div class="flex flex-row flex-nowrap w-full justify-between items-baseline mt-2">
		<div class="bg-emerald-200 h-1" style="flex-grow: 1;" />
		<div class="text-center px-4 text-emerald-700 font-bold">
			{entry.location.name}
		</div>
		<div class="grow bg-emerald-200 h-1" style="flex-grow: 5;" />
	</div>

	<div class="flex flex-row flex-wrap">
		{#each entry.trails as trail (trail.uid)}
			<div
				class="text-sm py-0 px-2 my-1 mx-2 border-2 border-emerald-100 bg-emerald-50 text-emerald-500 rounded-md font-semibold"
			>
				{trail.name}
			</div>
		{/each}
	</div>

	<div class="p-2 text-gray-700 text-sm font-semibold bg-gray-100 my-2 rounded-md">
		{entry.description || 'No description'}<br />
	</div>

	<div class="flex flex-row flex-wrap">
		{#each entry.keywords as k (k.uid)}
			<div class="flex flex-row flex-nowrap text-sm justify-start items-center">
				<img src="/images/icon-tag.svg" class="h-3" alt="keyword tag" />
				<a href="/keywords/{k.keyword}" class="pr-2 underline">{titleCase(k.keyword)}</a>
			</div>
		{/each}
	</div>
</div>
