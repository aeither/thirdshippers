export type ResData = {
	id: string;
	creator: string; // deployer
	newContract: string; // proxy
	contractModel: string; // implementation
	factory: string;
	transactionHash: string;
};
