<script context="module">
	import { user } from '$lib/stores';

	export const load = ({ session }) => {
		user.set(session.user);
		return {};
	};
</script>

<script>
	import '../app.css';
</script>

<html lang="en">
	<head>
		<title>GORBA Hours</title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<meta name="description" content="Tracking volunteer hours from GORBA executives." />
		<link rel="icon" href="img/favicon.png" />
	</head>
	<body class="">
		<slot />
	</body>
</html>
