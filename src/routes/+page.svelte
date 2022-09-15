<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await fetch('/api/random-number?min=20&max=100');
		const data = await res.json();
		console.log('🚀 ~ file: +page.svelte ~ line 7 ~ onMount ~ data', data);
	});
</script>

<div class="wrapper">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<button>Let's goooo!</button>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 90vh;
		text-align: center;
	}
</style>
