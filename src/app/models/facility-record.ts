import { FacilityTag } from "./facility-tag";

export class FacilityRecord {
  public tag: FacilityTag;
  public type: string;
  public description: string;
  public category: string;
  public securityApp: string;
  public isActive: boolean;
  public isRefAny: boolean;
  public isRefPNT: boolean;
  public isRefDDS: boolean;
  public info: string[];
  public attribute: string[];
  public table: string[];
  public yesNo: boolean[];
}
