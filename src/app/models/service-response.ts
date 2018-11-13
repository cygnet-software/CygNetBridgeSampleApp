export class ServiceResponse {
  public services: ServiceInfo[];

  constructor() {
    this.services = new Array<ServiceInfo>();
  }
}

export class ServiceInfo {
  public siteService: string;
  public description: string;
  public serviceType: string;
  public serviceStatus: string;
}
