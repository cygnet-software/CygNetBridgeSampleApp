export class RealtimeRequest {
  public PointTags: string[];
  public UpdatedAfter: string;

  constructor() {
    this.PointTags = new Array<string>();
  }
}
