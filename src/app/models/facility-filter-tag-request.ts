

export class FacilityFilterTagRequest {
  public SiteService: string;
  public Filters: Filters[];
  public LogicalOperator: string;

  constructor() {
    this.Filters = new Array<Filters>();
  }
}

export class Filters {
  public Criteria: FilterCriteria[];
  public LogicalOperator: string;

  constructor() {
    this.Criteria = new Array<FilterCriteria>();
  }
}

export class FilterCriteria {
  public PropertyId: string;
  public Value: string;
  public ComparisonOperator: string;
  public ComparisonMethod: string;
}
