<script>
	export let user;
	let password = '';
	let isAdmin = user.role === 'admin' ? true : false;

	const updateUser = async () => {
		user.role = isAdmin ? 'admin' : 'normie';
		if (password.length > 0) {
			user.newPassword = password;
		}
		let res = await fetch(`/api/users/${user.uid}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		const resultBox = document.getElementById(`update-result-${user.username}`);
		if (res.ok) {
			resultBox.textContent = 'Updated successfully';
		} else {
			resultBox.textContent = 'Technical Error, no save!';
		}
		password = '';
		setTimeout(() => (resultBox.textContent = ''), 2000);
	};
</script>

<form on:submit|preventDefault={updateUser}>
	<div class="border-2 background-gray-50 rounded-md w-6/12 py-2 px-4 inset-1 ">
		<div class="flex justify-between">
			<div class="text-lg text-gray-500 font-bold tracking-wide">{user.username}</div>
			<div>Admin: <input type="checkbox" bind:checked={isAdmin} /></div>
			<div>
				New password: <input
					type="password"
					class="border-2"
					name="password"
					bind:value={password}
				/><br />
			</div>
		</div>
		<button
			type="submit"
			class="border-2 border-emerald-400 py-1 px-2 rounded-md m-2 text-emerald-700">Update</button
		>
		<div id="update-result-{user.username}" />
	</div>
</form>
