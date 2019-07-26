
export class GetDatagroupTransactionsRequest{
    siteService: string;
	deviceId: string;
	dataGroupType: string;
    dataGroupOrdinal: number;
    options: DataGroupTransactionOptions;
}

export enum DataGroupTransactionOptions{
    NoData = 0,
    WithData = 1,
    WithDataAndRefs = 2
}