<script lang="ts">
	import RegistryTableHeader from 'src/lib/RegistryTableHeader.svelte';
	import { onMount } from 'svelte';
	import MarketingButton from 'src/lib/MarketingButton.svelte';
	import type { RegistryData } from 'src/types/basic';
	import RegistryTableRow from 'src/lib/RegistryTableRow.svelte';
	import FrontTitle from 'src/lib/FrontTitle.svelte';

	let eventData: {
		data: RegistryData[];
	};

	const ServerBaseUrl = 'https://shippers-api.lin3.xyz/';
	const fetchUrl = `${ServerBaseUrl}registry-polygon`;

	onMount(() => {
		async function fetchData() {
			const res = await fetch(fetchUrl);
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
			<RegistryTableHeader registry={eventData.data[0].registry} chain="polygon" />
			{#each eventData.data as data (data.id)}
				<RegistryTableRow {data} chain="polygon" />
			{/each}
		{/if}
		<MarketingButton />
	</div>
</div>

<style>
</style>
