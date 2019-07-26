export class PollDatagroupRequest{
    siteService: string;
	deviceId: string;
	dataGroupType: string;
    ordinal: number;
    fromDeviceParameters: string;
    returnTransactionData: boolean;
    maxWaitInMs: number;
}
