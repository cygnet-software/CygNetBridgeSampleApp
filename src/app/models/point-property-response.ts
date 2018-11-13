export class PointPropertyResponse {
  public results: PointPropertyValuePair[];
  public errors: PointPropertyErrorPair[];

  constructor() {
    this.results = new Array<PointPropertyValuePair>();
    this.errors = new Array<PointPropertyErrorPair>();
  }
}

export class PointPropertyValuePair {
  public pointTag: string;
  public properties: PointPropertyValue[];

  constructor() {
    this.properties = new Array<PointPropertyValue>();
  }
}

export class PointPropertyValue {
  public property: string;
  public value: string;
}

export class PointPropertyErrorPair {
  public pointTag: string;
  public errors: string[];

  constructor() {
    this.errors = new Array<string>();
  }
}
