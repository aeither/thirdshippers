<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { RegistryData } from 'src/types/basic';

	export let data: RegistryData;
	export let chain: 'polygon' | 'mumbai';

	const explorerBaseUrl =
		chain === 'polygon' ? 'https://polygonscan.com/' : 'https://mumbai.polygonscan.com/';
</script>

<div class="w-full" transition:slide|local>
	<div class="card w-full bg-neutral text-neutral-content">
		<div class="card-body flex flex-row items-center justify-between text-start">
			<p>
				<a href={explorerBaseUrl + 'address/' + data.release}>{data.release.slice(0, 20)}...</a>
			</p>
			<p>
				<a href={explorerBaseUrl + 'address/' + data.creator}>{data.creator.slice(0, 20)}...</a>
			</p>
			<p>
				<a href={explorerBaseUrl + 'tx/' + data.transactionHash}
					>{data.transactionHash.slice(0, 20)}...</a
				>
			</p>
			<div class="card-actions justify-end">
				<button
					class="btn btn-primary"
					on:click={() => window.open('https://thirdweb.com/' + data.creator)}>Open</button
				>
			</div>
		</div>
	</div>
</div>
