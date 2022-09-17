export type FactoryData = {
	id: string;
	creator: string; // deployer
	newContract: string; // proxy
	contractModel: string; // implementation
	factory: string;
	transactionHash: string;
};

export type RegistryData = {
	id: string;
	creator: string; // deployer
	release: string; // model
	registry: string;
	transactionHash: string;
};
