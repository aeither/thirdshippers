<script lang="ts">
	import FactoryTableHeader from 'src/lib/FactoryTableHeader.svelte';
	import { onMount } from 'svelte';
	import MarketingButton from 'src/lib/MarketingButton.svelte';
	import type { FactoryData } from 'src/types/basic';
	import FactoryTableRow from 'src/lib/FactoryTableRow.svelte';
	import FrontTitle from 'src/lib/FrontTitle.svelte';

	let eventData: {
		data: FactoryData[];
	};

	onMount(() => {
		async function fetchData() {
			const res = await fetch('https://shippers-api.lin3.xyz/factory-polygon');
			eventData = await res.json();
		}

		const interval = setInterval(fetchData, 3000);
		fetchData();

		return () => clearInterval(interval);
	});
</script>

<div class="container mx-auto px-4">
	<div class="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
		<FrontTitle />
		{#if eventData && eventData.data}
			<FactoryTableHeader factory={eventData.data[0].factory} chain="polygon" />
			{#each eventData.data as data (data.id)}
				<FactoryTableRow {data} chain="polygon" />
			{/each}
		{/if}

		<MarketingButton />
	</div>
</div>

<style>
</style>
