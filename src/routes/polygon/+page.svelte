<script lang="ts">
	import TableHeader from '$lib/TableHeader.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import MarketingButton from 'src/lib/MarketingButton.svelte';
	import type { ResData } from 'src/types/basic';

	let eventData: {
		data: ResData[];
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
		<h1>ThirdShippers</h1>
		<h2>Deployments in Real Time</h2>

		{#if eventData && eventData.data}
			<TableHeader factory={eventData.data[0].factory} />

			{#each eventData.data as data (data.id)}
				<div class="w-full" transition:slide|local>
					<div class="card w-full bg-neutral text-neutral-content">
						<div class="card-body flex flex-row items-center justify-between text-start">
							<p>
								<a href={'https://mumbai.polygonscan.com/address/' + data.newContract}
									>{data.newContract.slice(0, 20)}...</a
								>
							</p>
							<p>
								<a href={'https://mumbai.polygonscan.com/address/' + data.creator}
									>{data.creator.slice(0, 20)}...</a
								>
							</p>
							<p>
								<a href={'https://mumbai.polygonscan.com/address/' + data.contractModel}
									>{data.contractModel.slice(0, 20)}...</a
								>
							</p>
							<div class="card-actions justify-end">
								<button
									class="btn btn-primary"
									on:click={() =>
										window.open('https://mumbai.polygonscan.com/tx/' + data.transactionHash)}
									>Open</button
								>
							</div>
						</div>
					</div>
				</div>
			{/each}
		{/if}

		<MarketingButton />
	</div>
</div>

<style>
</style>
