<script lang="ts">
	import InputSlider from 'src/components/_ui/InputSlider.svelte';
	import Input from '$lib/Input.svelte';
	import { onMount } from 'svelte';

	let txs = {
		values: ['']
	};

	onMount(() => {
		async function fetchData() {
			const res = await fetch('/api/random-number?min=20&max=100');
			const data = await res.json();
			txs = data;
		}

		const interval = setInterval(fetchData, 3000);
		fetchData();

		return () => clearInterval(interval);
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-center">
	<div>
		<h1>Welcome to SvelteKit</h1>
		{#each txs.values as value}
			<div>
				<span>Hash: {value}</span>
			</div>
		{/each}
		<Input />
		<InputSlider value="slider" />

		<button class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">Say Hi!</button
		>
	</div>
</div>

<style>
</style>
