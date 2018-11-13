import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { PointTagFilterRequest, PointTagFilterCriteria, PointTagFilters } from '../models/point-tag-filter-request';
import { CygNetApiService } from '../core/cygnet-api.service';
import { PointTagFilterResponse } from '../models/point-tag-filter-response';
import { RealtimeRequest } from '../models/realtime-request';
import { RealtimeResponse, RealtimeValueRecord, RealtimeValuePair } from '../models/realtime-response';

@Component({
  selector: 'point-pane',
  templateUrl: './point-pane.component.html',
  styleUrls: ['./point-pane.component.scss']
})
export class PointPaneComponent implements OnInit, OnChanges {

  @Input() facilityTag: string;
  @Output() selectedPointEvent = new EventEmitter<string>();
  @Output() busy = new EventEmitter<boolean>();
  public facility: string;
  public siteService: string;
  public pointTagFilterRequest: PointTagFilterRequest;
  public realtimeResponse: RealtimeResponse;
  public selectedPoint: RealtimeValuePair;
  public started: boolean = false;

  constructor(private cygNet: CygNetApiService)
  {
    this.realtimeResponse = new RealtimeResponse();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.facilityTag != null) {
      this.parseFacilityTag();
      this.pointTagFilterRequest = this.createFilter(this.facility, this.siteService);
      this.getPoints();
      this.started = true;
    }
  }

  private async getPoints() {
    this.busy.emit(true);
    let pointTagResponse = await this.cygNet.postGetPointTagsByFilter(this.pointTagFilterRequest);
    this.busy.emit(false);
    let points = pointTagResponse.tags;

    let realtimeRequest = new RealtimeRequest();
    realtimeRequest.PointTags = points;
    this.realtimeResponse = await this.cygNet.postGetRealtimeValues(realtimeRequest);
    this.realtimeResponse.currentValues = this.reducePointTagFormat(this.realtimeResponse.currentValues);
  }

  private reducePointTagFormat(pointPairs: RealtimeValuePair[]): RealtimeValuePair[] {
    let shortened = new Array<RealtimeValuePair>();

    pointPairs.forEach(function (value) {
      let splits = value.pointTag.split(":");
      let short = new RealtimeValuePair();
      short.record = value.record;
      let siteService = splits[0].split(".");
      short.pointTag = siteService[0] + "." + siteService[1] + "::" + splits[2];
      shortened.push(short);
    });

    return shortened;
  }


  private parseFacilityTag(): void {
    let split = this.facilityTag.split("::", 2);
    this.siteService = split[0];
    this.facility = split[1];
  }

  private pointSelected($event) {
    this.selectedPointEvent.emit($event.data.pointTag);
  }

  private createFilter(facility: string, siteService: string): PointTagFilterRequest {

    let criteria = new PointTagFilterCriteria();
    criteria.PropertyId = "Facility";
    criteria.Value = facility;
    criteria.ComparisonOperator = "Equal";
    criteria.ComparisonMethod = "String";

    let filter = new PointTagFilters();
    filter.Criteria.push(criteria);
    filter.LogicalOperator = "And";

    let request = new PointTagFilterRequest();
    request.Filters.push(filter);
    request.SiteService = siteService;
    request.LogicalOperator = "And";

    return request;
  }


}
