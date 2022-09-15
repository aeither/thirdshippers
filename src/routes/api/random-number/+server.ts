import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { error } from '@sveltejs/kit';
import { readFileSync } from 'fs';

const values = ['hello', 'world', 'time'];
setInterval(() => values.push('hello'), 3000);

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

// poll
const txHashes = [''];
contract.events.listenToAllEvents((event) => {
	if (event.eventName === 'Transfer') {
		if (txHashes.length > 30) {
			txHashes.splice(0, txHashes.length - 25);
			txHashes.push(event.transaction.transactionHash);
		} else {
			txHashes.push(event.transaction.transactionHash);
		}
		// console.log('txHashes', txHashes);
	}
});

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: { url: URL }) {
	if (url) {
		const min = Number(url.searchParams.get('min') ?? '0');
	}
	// if (false) {
	// 	throw error(400, 'min and max must be numbers, and min must be less than max');
	// }

	const myOptions = { status: 200, statusText: 'Great!' };
	return new Response(JSON.stringify({ values: txHashes }), myOptions);
}
