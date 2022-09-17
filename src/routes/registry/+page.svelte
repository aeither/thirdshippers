<script lang="ts">
	import TableHeader from 'src/lib/FactoryTableHeader.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import MarketingButton from 'src/lib/MarketingButton.svelte';
	import type { RegistryData } from 'src/types/basic';
	import TableRow from 'src/lib/FactoryTableRow.svelte';

	let eventData: {
		data: RegistryData[];
	};

	onMount(() => {
		async function fetchData() {
			const res = await fetch('https://shippers-api.lin3.xyz/registry-polygon');
			eventData = await res.json();
			console.log("🚀 ~ file: +page.svelte ~ line 17 ~ fetchData ~ eventData", eventData)
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

		<!-- {#if eventData && eventData.data}
			<TableHeader factory={eventData.data[0].factory} />

			{#each eventData.data as data (data.id)}
				<TableRow {data} />
			{/each}
		{/if} -->

		<MarketingButton />
	</div>
</div>

<style>
</style>
