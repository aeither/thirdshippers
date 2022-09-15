<script lang="ts">
	import InputSlider from 'src/components/_ui/InputSlider.svelte';
	import Input from '$lib/Input.svelte';
	import { onMount } from 'svelte';
	
		onMount(async () => {
			const res = await fetch('/api/random-number?min=20&max=100');
			const data = await res.json();
			console.log('🚀 ~ file: +page.svelte ~ line 7 ~ onMount ~ data', data);
		});

	async function handleLogin(e: any) {
		e.preventDefault();
	}
</script>


<div class="flex min-h-screen flex-col items-center justify-center text-center">
	<div>
		<h1>Welcome to SvelteKit</h1>
		<Input />
		<InputSlider value="slider" />
		<form on:submit={handleLogin} class="card card-body" style="max-width: 400px">
			<button type="submit" class="btn btn-primary">Log In</button>
		</form>

		<button class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">...</button>
	</div>
</div>

<style>
</style>
