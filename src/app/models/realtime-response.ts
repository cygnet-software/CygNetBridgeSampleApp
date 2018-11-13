export class RealtimeResponse {
  public currentValues: RealtimeValuePair[];
  public errors: RealtimeErrorPair[];

  constructor() {
    this.currentValues = new Array<RealtimeValuePair>();
    this.errors = new Array<RealtimeErrorPair>();
  }
}

export class RealtimeErrorPair {
  public pointTag: string;
  public error: string;
}

export class RealtimeValuePair {
  public pointTag: string;
  public record: RealtimeValueRecord;

  constructor() {
    this.record = new RealtimeValueRecord();
  }

}

export class RealtimeValueRecord {
  public timestamp: Date;
  public value: string;
  public alternateValue: string;
  public status: string[];
  public userStatus: string[];

  constructor() {
    this.status = new Array<string>();
    this.userStatus = new Array<string>();
    this.timestamp = new Date();
    this.value = "";
    this.alternateValue = "";
  }
}
