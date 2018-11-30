import { SiteService } from "./site-service";

export class FacilityResponse {
  public facility: FacilityRecord;
}

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
export class FacilityTag {
  // There are many more fields in the response.  If you don't define them they're just not mapped onto anything. 
  public facilityId: string;
  public siteService: SiteService;
  public site: string;
  public service: string;
}
