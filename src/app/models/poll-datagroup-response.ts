import { TransactionHeader, DataGroupTransaction } from "./get-datagroup-transactions-response";

export class PollDatagroupResponse{
    error: string;
    transaction: DataGroupTransaction;
}
