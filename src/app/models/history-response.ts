export class HistoryResponse {
  public historyRecords: HistoryEntry[];

  constructor() {
    this.historyRecords = new Array<HistoryEntry>();
  }
}

export class HistoryEntry {
  public value: string;
  public timestamp: Date;
}
