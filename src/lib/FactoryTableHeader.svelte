<script lang="ts">
	export let factory: string;
	export let chain: 'polygon' | 'mumbai';

	const explorerBaseUrl =
		chain === 'polygon'
			? 'https://polygonscan.com/address/'
			: 'https://mumbai.polygonscan.com/address/';
</script>

<div class="card w-full bg-accent text-accent-content">
	<div class="card-body flex flex-row items-center justify-between text-start">
		<h2 class="card-title">Created Contract</h2>
		<h2 class="card-title">Creator</h2>
		<h2 class="card-title">Contract Type</h2>
		<!-- svelte-ignore a11y-missing-content -->
		<h2 class="card-title text-primary">
			<a href={explorerBaseUrl + factory}>Factory</a>
		</h2>
	</div>
</div>
