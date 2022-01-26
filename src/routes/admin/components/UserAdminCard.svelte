<script>
	export let user;
	let isAdmin = user.role === 'admin' ? true : false;

	const updateUser = async () => {
		user.role = isAdmin ? 'admin' : 'normie';
		let res = await fetch(`/api/users/${user.uid}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		// Complete this.
	};
</script>

<div class="border-2 background-gray-50 rounded-md w-96 py-2 px-4 inset-1 ">
	<div class="flex justify-between">
		<div class="text-lg text-gray-500 font-bold tracking-wide">{user.username}</div>
		<div>Admin: <input type="checkbox" bind:checked={isAdmin} /></div>
	</div>
	<button
		class="border-2 border-emerald-400 py-1 px-2 rounded-md m-2 text-emerald-700"
		on:click={updateUser}>Update</button
	>
</div>
