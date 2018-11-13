export class HistoryRollupResponse {
  public historyRecords: HistoryRecord[];

  constructor() {
    this.historyRecords = new Array<HistoryRecord>();
  }
}

export class HistoryRecord {
  public value: string;
  public timestamp: Date;
}
