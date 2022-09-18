<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { FactoryData } from 'src/types/basic';

	export let data: FactoryData;
	export let chain: 'polygon' | 'mumbai';

	const explorerBaseUrl =
		chain === 'polygon' ? 'https://polygonscan.com/' : 'https://mumbai.polygonscan.com/';
</script>

<div class="w-full" transition:slide|local>
	<div class="card w-full bg-neutral text-neutral-content">
		<div class="card-body flex flex-row items-center justify-between text-start">
			<div>
				<p>{data.newContractName}</p>
				<a href={explorerBaseUrl + 'address/' + data.newContract}
					>{data.newContract.slice(0, 20)}...</a
				>
			</div>
			<a href={explorerBaseUrl + 'address/' + data.creator}>{data.creator.slice(0, 20)}...</a>
			<div>
				<p>{data.contractModelName}</p>
				<a href={explorerBaseUrl + 'address/' + data.contractModel}
					>{data.contractModel.slice(0, 20)}...</a
				>
			</div>
			<div class="card-actions justify-end">
				<button
					class="btn btn-primary"
					on:click={() => window.open(explorerBaseUrl + 'tx/' + data.transactionHash)}>Open</button
				>
			</div>
		</div>
	</div>
</div>
