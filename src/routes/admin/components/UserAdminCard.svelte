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
		<div
			class="background-gray-50 rounded-md py-2 px-4 shadow-inner-sm m-1 border bg-gray-100 w-full"
		>
			<div class="flex flex-col justify-between inner-md w-full ">
				<div class="flex flex-row justify-between items-baseline border-b-gray-300 border-b-2">
					<div class="text-2xl text-gray-700 font-bold tracking-wider pb-1">
						{user.username}
					</div>
					<div class="flex justify-between w-44">
						<div class="font-bold text-emerald-600">
							Admin: {user.role === 'admin' ? '✔️' : '❌'}
						</div>
						<div>
							<span
								on:click|preventDefault={toggleAdmin}
								class="cursor-pointer text-emerald-800 font-semibold underline"
								>{user.role === 'admin' ? 'de-admin' : 'adminize'}</span
							>
						</div>
					</div>
				</div>

				<div class="text-slate-700 mt-2 flex flex-row items-center  text-sm">
					<div class="rounded-full bg-slate-200 p-1 mr-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4  fill-slate-900"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
						</svg>
					</div>
					{user.email}
				</div>

				<div class="my-2">
					<div class="ml-2 text-emerald-600 font-semibold">Set password</div>
					<input
						type="password"
						class="border rounded-md shadow-inner-sm w-full border-gray-300 py-1 px-4"
						name="password"
						bind:value={password}
					/><br />
				</div>
				<button
					type="submit"
					class="border border-emerald-500 py-1 rounded-md text-emerald-700 w-full bg-emerald-50 font-semibold"
					>Update {user.username}</button
				>
				<div id="update-result-{user.username}" />
			</div>
		</div>
	</form>
</div>
