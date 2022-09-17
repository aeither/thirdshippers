<script lang="ts">
	export let registry: string;
	export let chain: 'polygon' | 'mumbai';

	const explorerBaseUrl =
		chain === 'polygon'
			? 'https://polygonscan.com/address/'
			: 'https://mumbai.polygonscan.com/address/';
</script>

<div class="card w-full bg-accent text-accent-content">
	<div class="card-body flex flex-row items-center justify-between text-start">
		<h2 class="card-title">Release</h2>
		<h2 class="card-title">Creator</h2>
		<h2 class="card-title">Transaction Hash</h2>
		<!-- svelte-ignore a11y-missing-content -->
		<h2 class="card-title text-primary-content underline">
			<a href={explorerBaseUrl + registry}>Registry</a>
		</h2>
	</div>
</div>
