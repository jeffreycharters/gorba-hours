<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/api/entries/keywords');
		const body = await res.json();

		const keywords = body.keywords.sort((a, b) => (a.keyword > b.keyword ? 1 : -1));

		return {
			props: { keywords: keywords }
		};
	};
</script>

<script>
	export let keywords;

	import { user } from '$lib/stores';
	import KeywordAddForm from './components/KeywordAddForm.svelte';
	import { recessedComponent } from '$lib/styles';
	import ToggleActive from '$lib/components/shared/ToggleActive.svelte';

	const addKeyword = async (e) => {
		const res = await fetch('/api/entries/keywords', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ keyword: e.detail })
		});
		const body = await res.json();
		if (res.ok) {
			keywords = keywords.filter((k) => k.keyword != body.keyword.keyword);
			keywords = [...keywords, body.keyword].sort((a, b) => (a.keyword > b.keyword ? 1 : -1));
		}
	};

	const toggleKeywordActive = async (e) => {
		const res = await fetch('/api/entries/keywords', {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ uid: e.detail })
		});
	};
</script>

<div class="sm:max-w-lg sm:mx-auto">
	<div class={recessedComponent}>
		<h1 class="m-2 text-xl font-bold">Keywords</h1>
	</div>

	<div class="{recessedComponent} flex flex-col gap-1">
		<ul>
			{#each keywords as keyword (keyword.uid)}
				<ToggleActive item={keyword} admin={$user.admin} on:toggleActive={toggleKeywordActive} />
			{/each}
		</ul>

		<div class="m-2 px-6 py-2 text-slate-600 bg-slate-200 rounded-md border-slate-300 border">
			<strong class="text-slate-700">Note:</strong> A deactivated keyword will not show up on the 'New
			Entry' form.
		</div>
	</div>

	<div class={recessedComponent}>
		<KeywordAddForm on:addKeyword={addKeyword} />
	</div>
</div>
