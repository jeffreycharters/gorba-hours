<script>
	export let user;
	let password = '';

	const setUser = async () => {
		let res = await fetch(`/api/users/${user.uid}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		return res;
	};

	const updateUser = async () => {
		if (password.length > 0) {
			user.newPassword = password;
		}

		let res = setUser();

		const resultBox = document.getElementById(`update-result-${user.username}`);
		if (res.ok) {
			resultBox.textContent = 'Updated successfully';
		} else {
			resultBox.textContent = 'Technical Error, no save!';
		}
		password = '';
		setTimeout(() => (resultBox.textContent = ''), 2000);
	};

	const toggleAdmin = () => {
		if (user.role === 'admin') {
			user.role = 'normie';
		} else {
			user.role = 'admin';
		}
		let res = setUser();
	};
</script>

<div class="mb-4">
	<form on:submit|preventDefault={updateUser}>
		<div class="background-gray-50 rounded-md w-auto py-2 px-4 shadow-inner-sm m-1 border">
			<div class="flex flex-col justify-between inner-md">
				<div class="text-2xl text-gray-500 font-bold tracking-wider mb-6">{user.username}</div>
				<div class="flex justify-between border-b border-b-emerald-900 mb-4">
					<div class="font-bold text-emerald-600">
						Admin: {user.role === 'admin' ? '✔️' : '❌'}
					</div>
					<div>
						<span
							on:click|preventDefault={toggleAdmin}
							class="cursor-pointer text-emerald-800 font-semibold"
							>{user.role === 'admin' ? 'de-admin' : 'adminize'}</span
						>
					</div>
				</div>
				<div class="font-semibold text-emerald-600">
					New password <input
						type="password"
						class="border rounded-md shadow-inner-sm w-full border-gray-300"
						name="password"
						bind:value={password}
					/><br />
				</div>
				<button
					type="submit"
					class="border border-emerald-400 py-1 rounded-md text-emerald-700 w-full mt-4 bg-emerald-100 font-bold"
					>Update {user.username}</button
				>
				<div id="update-result-{user.username}" />
			</div>
		</div>
	</form>
</div>
