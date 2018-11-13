export class RelativeFacilityResponse {
  public relativeFacilities: RelationshipPair[];

  constructor() {
    this.relativeFacilities = new Array<RelationshipPair>();
  }
}

export class RelationshipPair {
  public relationship: string;
  public relative: string;
}
