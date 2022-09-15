<script lang="ts">
	let loginData = {
		email: '',
		password: ''
	};

	async function handleLogin(e: any) {
		e.preventDefault();
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-center">
	<div>
		<h1>Welcome to SvelteKit</h1>

		<form on:submit={handleLogin} class="card card-body" style="max-width: 400px">
			<button type="submit" class="btn btn-primary">Log In</button>
		</form>
		<button class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">...</button>
	</div>
</div>

<style>
</style>
