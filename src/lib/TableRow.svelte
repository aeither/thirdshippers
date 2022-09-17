<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { ResData } from 'src/types/basic';

	export let data: ResData;
</script>

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
					on:click={() => window.open('https://mumbai.polygonscan.com/tx/' + data.transactionHash)}
					>Open</button
				>
			</div>
		</div>
	</div>
</div>
