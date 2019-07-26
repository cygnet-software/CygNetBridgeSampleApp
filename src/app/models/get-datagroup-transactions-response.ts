export class GetDatagroupTransactionsResponse{
   transactions: DataGroupTransaction[];
}

export class DataGroupTransaction{
    header: TransactionHeader;
	transactionDataXml: string;
}

export class TransactionHeader{
    deviceId: string;
    facilityId: string;
    dataGroupType: string;
    dataGroupOrdinal: number;
    dataBaseKey: string;
    timestamp: Date;
    type: TransactionType;
    userId: string;
    statusCode: TransactionStatus;
    statusMessage: string;
    majorVersion: number;
    minorVersion: number;
    dataSize: number;
    headerSize: number;
    indexItem: number ;
    appDefined1: number;
    appDefined2: number;
    appDefined3: number;
    appDefined4: number;
    hasPartialData: boolean;
    compressSize: number;
    blobCount: number
}

enum TransactionType
{
    Get = 0,
    Send = 1,
    Put = 2,
    Import = 3,
    Export = 4,
    Operation = 5,
    Unknown = 6
}

enum TransactionStatus
{
    Init = 0,
    InProgress = 1,
    Failed = 2,
    Succeeded = 3,
    Max = 4
}