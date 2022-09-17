<script lang="ts">
	import MarketingButton from 'src/lib/MarketingButton.svelte';
	import FactoryTableHeader from 'src/lib/FactoryTableHeader.svelte';
	import { onMount } from 'svelte';
	import type { FactoryData } from 'src/types/basic';
	import FactoryTableRow from 'src/lib/FactoryTableRow.svelte';

	let eventData: {
		data: FactoryData[];
	};
	// $: txs = {
	// 	values: [
	// 		'Hash: 0x72fea5a535cc7b9d6de8f4ce15bdba88a14bfcecdf1f2a4889b5bdca2c66ce0b 2',
	// 		'Hash: 0x455c52f528c082f4a2be5f71d6a8938394f8708bdcdd9ed01f43621d4e696a6a 3',
	// 		'Hash: 0x455c52f528c082f4a2be5f71d6a8938394f8708bdcdd9ed01f43621d4e696a6a 4',
	// 		'Hash: 0x455c52f528c082f4a2be5f71d6a8938394f8708bdcdd9ed01f43621d4e696a6a 5',
	// 		'Hash: 0xcf66aa7637863f28d1c4be1d45879c1926e848f968bf7689dfe0c493d8f64747 6',
	// 		'Hash: 0xb9f22f5f2df67d8ac0f602b0e75a84c19c00d8801eb857199104df7f8217598b 7'
	// 	]
	// };

	onMount(() => {
		async function fetchData() {
			const res = await fetch('https://shippers-api.lin3.xyz/factory-mumbai');
			eventData = await res.json();
		}

		const interval = setInterval(fetchData, 3000);
		fetchData();

		return () => clearInterval(interval);
	});
</script>

<div class="container mx-auto px-4">
	<div class="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
		<h1>ThirdShippers</h1>
		<h2>Deployments in Real Time</h2>

		{#if eventData && eventData.data}
			<FactoryTableHeader factory={eventData.data[0].factory} chain="mumbai" />
			{#each eventData.data as data (data.id)}
				<FactoryTableRow {data} chain="mumbai" />
			{/each}
		{/if}

		<MarketingButton />
	</div>
</div>

<style>
</style>
