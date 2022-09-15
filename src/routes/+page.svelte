<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';

	import { onMount } from 'svelte';

	let txs = '';
	// onMount(async () => {
	// 	const res = await fetch('/api/random-number?min=20&max=100');
	// 	const data = await res.json();
	// 	txs = data;
	// 	console.log('🚀 ~ file: +page.svelte ~ line 12 ~ onMount ~ data', data);
	// });

	const queryResult = useQuery(
		'repoData',
		() => fetch('/api/random-number?min=20&max=100').then((res) => res.json()),
		{ refetchInterval: 3000 }
	);

	async function handleLogin(e: any) {
		e.preventDefault();
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-center">
	<div>
		<h1>Welcome to SvelteKit</h1>
		<div>
			<span>Hash: {txs}</span>
		</div>
		{#if $queryResult.isLoading}
			<span>Loading...</span>
		{:else if $queryResult.error}
			<span>An error has occurred</span>
		{:else}
			<div>
				<p>{$queryResult.data}</p>
			</div>
		{/if}
	</div>
</div>

<style>
</style>
