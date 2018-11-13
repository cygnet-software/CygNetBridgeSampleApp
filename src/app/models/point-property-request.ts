export class PointPropertyRequest {
  public properties: string[];
  public pointTags: string[];

  constructor() {
    this.properties = new Array<string>();
    this.pointTags = new Array<string>();
  }
}

