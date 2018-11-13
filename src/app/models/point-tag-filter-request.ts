export class PointTagFilterRequest {
  public SiteService: string;
  public Filters: PointTagFilters[];
  public LogicalOperator: string;

  constructor() {
    this.Filters = new Array<PointTagFilters>();
  }
}

export class PointTagFilters {
  public Criteria: PointTagFilterCriteria[];
  public LogicalOperator: string;

  constructor() {
    this.Criteria = new Array<PointTagFilterCriteria>();
  }
}

export class PointTagFilterCriteria {
  public PropertyId: string;
  public Value: string;
  public ComparisonOperator: string;
  public ComparisonMethod: string;
}
