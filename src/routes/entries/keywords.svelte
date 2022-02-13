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

	import KeywordCard from './components/KeywordCard.svelte';
	import KeywordAddForm from './components/KeywordAddForm.svelte';

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
		const body = await res.json();
		const inactivateKeyword = body.keyword;
		if (res.ok) {
			keywords = keywords.filter((k) => k.uid != e.detail);
			keywords = [...keywords, inactivateKeyword].sort((a, b) => (a.keyword > b.keyword ? 1 : -1));
		}
	};

	const deleteKeyword = async (e) => {
		const res = await fetch('/api/entries/keywords', {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ uid: e.detail })
		});
		if (res.ok) {
			keywords = keywords.filter((k) => k.uid != e.detail);
		}
	};
</script>

<h1 class="m-2 text-xl font-bold">Keywords</h1>

{#each keywords as keyword (keyword.uid)}
	<div>
		<KeywordCard
			{keyword}
			on:toggleKeywordActive={toggleKeywordActive}
			on:deleteKeyword={deleteKeyword}
		/>
	</div>
{/each}

<div class="m-2 px-2 text-slate-600">
	<strong class="text-slate-700">Note:</strong> A deactivated keyword will not show up on the 'New Entry'
	form.
</div>

<KeywordAddForm on:addKeyword={addKeyword} />
