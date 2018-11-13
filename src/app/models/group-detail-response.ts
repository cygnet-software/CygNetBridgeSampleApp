
export class GroupDetailResponse {
  public node: GroupNodeDetail;
}

export class GroupNodeDetail {
  public attributes: string[];
  public applications: string[];
  public yesNoFields: boolean[];

  public createdUserId: string;
  public createdTimestamp: Date;
  public updatedTimestamp: Date;
  public securityEvent: string;
  public isVisible: boolean;
  public autoMaintain: boolean;
  public hasAuxiliaryData: boolean;
  public auxiliaryDataLength: number;
  public updatedUserId: string;
  public securityApplication: string;
  public referenceId: string;
  public auxiliaryDataCRC: number;
  public referenceService: string;
  public referenceSite: string;
  public description: string;
  public referenceType: string;
  public type: string;
  public category: string;
  public id: number;
  public hierarchyRoot: number;
  public auxiliaryDataTimestamp: Date;
}
