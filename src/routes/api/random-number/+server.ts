import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { error } from '@sveltejs/kit';
import { readFileSync } from 'fs';

/** @type {import('./$types').RequestHandler} */
export function GET({ url }: { url: URL }) {
	// Deployer
	// const CHAIN_ID = 'mumbai';
	// const DEPLOYER_ADDRESS = '0x7c487845f98938Bb955B1D5AD069d9a30e4131fd';
	// const ABI_JSON = readFileSync('src/data/deployerAbi.json', 'utf-8');

	// USDC
	const CHAIN_ID = 'polygon';
	const DEPLOYER_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
	const ABI_JSON = readFileSync('src/data/USDC.json', 'utf-8');

	const sdk = new ThirdwebSDK(CHAIN_ID);
	const contract = sdk.getContractFromAbi(DEPLOYER_ADDRESS, JSON.parse(ABI_JSON));

	contract.events.listenToAllEvents((event) => {
		if (event.eventName === 'Approval') {
			console.log(event);
			return new Response(event.transaction.transactionHash);
		}
	});

	const min = Number(url.searchParams.get('min') ?? '0');
	const max = Number(url.searchParams.get('max') ?? '1');

	const d = max - min;

	if (isNaN(d) || d < 0) {
		throw error(400, 'min and max must be numbers, and min must be less than max');
	}

	const random = min + Math.random() * d;

	return new Response(String(random));
}
