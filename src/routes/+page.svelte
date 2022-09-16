<script lang="ts">
	import TableHeader from '$lib/TableHeader.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	type ResData = {
		id: string;
		creator: string; // deployer
		newContract: string; // proxy
		contractModel: string; // implementation
		factory: string;
		transactionHash: string;
	};

	let eventData: {
		data: ResData[];
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
			const res = await fetch('/api/random-number?min=20&max=100');
			eventData = await res.json();
		}

		const interval = setInterval(fetchData, 3000);
		fetchData();

		return () => clearInterval(interval);
	});
</script>

<div class="container mx-auto px-4">
	<div class="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
		<h1>Real Time Deploys</h1>

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

		<button
			class="btn btn-primary"
			on:click={() =>
				window.open(
					'https://twitter.com/intent/tweet?text=I%20recently%20learned%20about%20ThirdShippers%2C%20a%20service%20that%20allows%20you%20to%20check%20who%20is%20shipping%20Thirdweb%20contracts%20in%20real%20time.%20%40giovannifulin%20created%20it.%0A%0AVisit%20thirdshippers.vercel.app%20to%20learn%20more.'
				)}>Share the excitement!</button
		>
	</div>
</div>

<style>
</style>
