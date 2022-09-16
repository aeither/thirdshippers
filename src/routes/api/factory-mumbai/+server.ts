import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { readFileSync } from 'fs';

// Registry
// const CHAIN_ID = 'mumbai';
// const DEPLOYER_ADDRESS = '0x7c487845f98938Bb955B1D5AD069d9a30e4131fd';
// const ABI_JSON = readFileSync('src/data/deployerAbi.json', 'utf-8');

// Deployer/Factory
const CHAIN_ID = 'mumbai';
const DEPLOYER_ADDRESS = '0x5DBC7B840baa9daBcBe9D2492E45D7244B54A2A0';
const ABI_JSON = readFileSync('src/data/deployerAbi.json', 'utf-8');

// USDC
// const CHAIN_ID = 'polygon';
// const DEPLOYER_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
// const ABI_JSON = readFileSync('src/data/USDC.json', 'utf-8');

const sdk = new ThirdwebSDK(CHAIN_ID);
const contract = sdk.getContractFromAbi(DEPLOYER_ADDRESS, JSON.parse(ABI_JSON));

type ResData = {
	id: string;
	creator: string; // deployer
	newContract: string; // proxy
	contractModel: string; // implementation
	factory: string;
	transactionHash: string;
};
// poll
// let resData: ResData[] = [];
let resData: ResData[] = [
	{
		id: 'DEMO',
		creator: '0x689948D2E223215921efBA79e5d9594c36caa000', // deployer
		newContract: '0x8Bdfc7fdB1253dE408A902A4A638437fEFd44D22', // proxy
		contractModel: '0x0bBA31EAf82C649C0B9579F5F44374C74F4605Ea', // implementation
		factory: '0x5DBC7B840baa9daBcBe9D2492E45D7244B54A2A0',
		transactionHash: '0xfedd33eadf1647ae5c00b9e479561979476869be1f43bccb2b92502413e72709'
	}
];

// const events = await contract.events.getEvents('ProxyDeployed');

contract.events.listenToAllEvents((event) => {
	console.log(event);
	if (event.eventName === 'ProxyDeployed') {
		if (resData && resData.length && resData.length > 30) {
			resData.splice(0, resData.length - 25);
			resData = [
				{
					id: event.transaction.transactionHash + event.transaction.logIndex,
					creator: event.data.deployer as string,
					newContract: event.data.proxy as string,
					contractModel: event.data.implementation as string,
					factory: event.transaction.address,
					transactionHash: event.transaction.transactionHash
				},
				...resData
			];
		} else {
			resData = [
				{
					id: event.transaction.transactionHash + event.transaction.logIndex,
					creator: event.data.deployer as string,
					newContract: event.data.proxy as string,
					contractModel: event.data.implementation as string,
					factory: event.transaction.address,
					transactionHash: event.transaction.transactionHash
				},
				...resData
			];
		}
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
	return new Response(JSON.stringify({ data: resData }), myOptions);
}

// const object = {
// 	eventName: 'ProxyDeployed',
// 	data: {
// 		implementation: '0x0bBA31EAf82C649C0B9579F5F44374C74F4605Ea',
// 		proxy: '0x8Bdfc7fdB1253dE408A902A4A638437fEFd44D22',
// 		deployer: '0x689948D2E223215921efBA79e5d9594c36caa000'
// 	},
// 	transaction: {
// 		blockNumber: 28132520,
// 		blockHash: '0xc2fedef1559a66e4b36b883b623cad573480cb4764a1f1f78ef8f81b33a3c0b1',
// 		transactionIndex: 36,
// 		removed: false,
// 		address: '0x5DBC7B840baa9daBcBe9D2492E45D7244B54A2A0',
// 		data: '0x0000000000000000000000008bdfc7fdb1253de408a902a4a638437fefd44d22',
// 		topics: [
// 			'0x9e0862c4ebff2150fbbfd3f8547483f55bdec0c34fd977d3fccaa55d6c4ce784',
// 			'0x0000000000000000000000000bba31eaf82c649c0b9579f5f44374c74f4605ea',
// 			'0x000000000000000000000000689948d2e223215921efba79e5d9594c36caa000'
// 		],
// 		transactionHash: '0xfedd33eadf1647ae5c00b9e479561979476869be1f43bccb2b92502413e72709',
// 		logIndex: 200
// 	}
// };
