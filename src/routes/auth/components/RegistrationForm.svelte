<script>
	import { createEventDispatcher } from 'svelte';

	let username = '';
	let email = '';
	let password = '';

	let flash;

	let dispatch = createEventDispatcher();

	const register = async () => {
		const res = await fetch('/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				username,
				email,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			dispatch('success');
		} else if (res.status === 409) {
			flash = 'Username or email address is taken.';
		}
	};
</script>

<div>
	<h2 class="text-4xl font-bold mb-4 text-emerald-800 upper">Sign Up</h2>

	<form>
		<div class="flex flex-col max-w-98vw md:w-96 gap-4">
			<div class="flex flex-col">
				<label for="email" class="font-bold text-gray-500">Username:</label>
				<input
					class="border-2 border-emerald-700 rounded py-2 px-4"
					type="text"
					placeholder="Username"
					id="username"
					bind:value={username}
				/>
			</div>
			<div class="flex flex-col">
				<label for="email" class="font-bold text-gray-500">Email:</label>
				<input
					class="border-2 border-emerald-700 rounded py-2 px-4"
					type="email"
					placeholder="Email"
					id="email"
					bind:value={email}
				/>
			</div>

			<div class="flex flex-col">
				<label for="email" class="font-bold text-gray-500">Password:</label>
				<input
					class="border-2 border-emerald-700 rounded py-2 px-4"
					type="password"
					placeholder="Password"
					id="password"
					bind:value={password}
				/>
			</div>

			{#if flash}
				<div class="text-red-600 font-bold px-2">
					{flash}
				</div>
			{/if}

			<button
				class="border-2 border-emerald-700 py-2 px-4 bg-emerald-600 text-white hover:bg-emerald-500  hover:text-emerald-50 rounded font-bold text-lg"
				on:click|preventDefault={register}>Sign up</button
			>
		</div>
	</form>

	<div class="fledx justify-evenly p-4">
		<div on:click={() => dispatch('toggle')} class="cursor-pointer text-emerald-600 font-bold">
			Sign in?
		</div>
	</div>
</div>
