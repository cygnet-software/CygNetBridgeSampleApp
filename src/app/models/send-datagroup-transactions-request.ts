export class SendDatagroupTransactionsRequest{
    siteService: string;
	deviceId: string;
	dataGroupType: string;
    dataGroupOrdinal: number;
    dataGroupTransactionData: string;
    fromDeviceParameters: string;
    toDeviceParameters: string;
    maxWaitInMs: number;
}
