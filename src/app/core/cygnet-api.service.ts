import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { FacilityRecord } from '../models/facility-record';
import { PointConfigRecord } from '../models/point-config-record';
import { PointValueRecord } from '../models/point-value-record';
import { GroupResponse } from '../models/group-response';
import { FacilityResponse } from '../models/facility-response';
import { FacilityFilterTagRequest } from '../models/facility-filter-tag-request';
import { FacilityFilterTagResponse } from '../models/facility-filter-tag-response';
import { HistoryResponse } from '../models/history-response';
import { RealtimeRequest } from '../models/realtime-request';
import { RealtimeResponse } from '../models/realtime-response';
import { ServiceResponse } from '../models/service-response';
import { GroupDetailResponse } from '../models/group-detail-response';
import { PointTagFilterRequest } from '../models/point-tag-filter-request';
import { PointTagFilterResponse } from '../models/point-tag-filter-response';
import { PointPropertyRequest } from '../models/point-property-request';
import { PointPropertyResponse } from '../models/point-property-response';
import { RelativeFacilityRequest } from '../models/relative-facility-request';
import { RelativeFacilityResponse } from '../models/relative-facility-response';
import { HistoryRollupMinuteRequest, HistoryRollupHourRequest, HistoryRollupDayRequest } from '../models/history-rollup-request';
import { HistoryRollupResponse } from '../models/history-rollup-response';


@Injectable({
  providedIn: 'root'
})
export class CygNetApiService {
  private baseUrl: string = "http://localhost";

  private authToken: string;
  private domain: number = null;

  constructor(private http: HttpClient)
  {
    this.authToken = "";
  }

  public isDomainSet(): boolean {
    return this.domain > 0;
  }

  public setDomain(domain: number): void {
    this.domain = domain;
  }

  public getDomain(): number {
    return this.domain;
  }

  public isLoggedIn(): boolean {
    return this.authToken.length != 0;
  }

  public async Login() {
    this.authToken = await this.getAuthenticationToken();
  }

  public setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  public async getServicesForDomain(domain: number): Promise<ServiceResponse> {
    let services: ServiceResponse = await this.http.get<ServiceResponse>(this.buildUrl(`api/v1/services?domain=${domain}`),
      { headers: this.makeHeaders() } ).toPromise();
    return services;
  }

  public async getFacilityByFacilityTag(facilityTag: string): Promise<FacilityResponse> {
    let facilityResponse: FacilityResponse = await this.http.get<FacilityResponse>(this.buildUrl(`api/v1/facilities/${facilityTag}`),
      { headers: this.makeHeaders() }).toPromise();
    return facilityResponse;
  }

  public async postGetFacilityTags(facilityTagRequest: FacilityFilterTagRequest) {
    console.log(JSON.stringify(facilityTagRequest, null, 2));
    let response: FacilityFilterTagResponse = await this.http.post<FacilityFilterTagResponse>(this.buildUrl(`api/v1/facilities/tags`),
      JSON.stringify(facilityTagRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return response;
  }

  public async getPointConfigRecordByPointTag(pointTag: string) {
    let pointConfigRecord: PointConfigRecord = await this.http.get<PointConfigRecord>(this.buildUrl(`api/v1/points/${pointTag}/configs/`),
      { headers: this.makeHeaders() }).toPromise();
    return pointConfigRecord;
  }

  public async postGetPointTagsByFilter(pointTagRequest: PointTagFilterRequest) {
    let pointTagResponse: PointTagFilterResponse = await this.http.post<PointTagFilterResponse>(this.buildUrl(`api/v1/points/tags`),
      JSON.stringify(pointTagRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return pointTagResponse;
  }

  public async getCurrentValueByPointTag(pointTag: string) {
    let realTimeEntry: PointValueRecord = await this.http.get<PointValueRecord>(this.buildUrl(`api/v1/points/values/${pointTag}`),
      { headers: this.makeHeaders() }).toPromise();
    return realTimeEntry;
  }

  public async getGroupRoots(siteService: string) {
    let groupResponse: GroupResponse = await this.http.get<GroupResponse>(this.buildUrl(`api/v1/groups/roots/?siteService=${siteService}`),
      { headers: this.makeHeaders() } ).toPromise();
    return groupResponse;
  }

  public async getGroupChildren(siteService: string, nodeId: number) {
    let groupResponse: GroupResponse = await this.http.get<GroupResponse>(this.buildUrl(`api/v1/groups/${nodeId}/children/?siteService=${siteService}`),
      { headers: this.makeHeaders() } ).toPromise();
    return groupResponse;
  }

  public async getGroupNodeDetails(siteService: string, nodeId: number) {
    let groupDetailResponse: GroupDetailResponse = await this.http.get<GroupDetailResponse>(this.buildUrl(`api/v1/groups/${nodeId}?siteService=${siteService}`),
      { headers: this.makeHeaders() } ).toPromise();
    return groupDetailResponse;
  }

  public async getHistoryValues(pointTag: string, startDate: Date, endDate: Date) {
    let startDateString = startDate.toISOString();
    let endDateString = endDate.toISOString();
    let historyResponse: HistoryResponse = await this.http.get<HistoryResponse>(this.buildUrl(`api/v1/points/${pointTag}/history/?start=${startDateString}&end=${endDateString}`),
      { headers: this.makeHeaders() } ).toPromise();
    return historyResponse;
  }

  public async postGetRealtimeValues(realtimeRequest: RealtimeRequest) {
    console.log(JSON.stringify(realtimeRequest, null, 2));
    let realtimeResponse: RealtimeResponse = await this.http.post<RealtimeResponse>(this.buildUrl(`api/v1/points/currentValues`),
      JSON.stringify(realtimeRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return realtimeResponse;
  }

  public async postGetRealtimeValuesLightweight(realtimeRequest: RealtimeRequest, updatedAfter: Date) {
    console.log(JSON.stringify(realtimeRequest, null, 2));
    let realtimeResponse: RealtimeResponse = await this.http.post<RealtimeResponse>(this.buildUrl(`api/v1/points/currentValues/?updatedAfter=${updatedAfter.toISOString()}`),
      JSON.stringify(realtimeRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return realtimeResponse;
  }

  public async postGetPointProperty(pointPropertyRequest: PointPropertyRequest) {
    console.log(JSON.stringify(pointPropertyRequest, null, 2));
    let pointPropertyResponse: PointPropertyResponse = await this.http.post<PointPropertyResponse>(this.buildUrl(`api/v1/points/properties`),
      JSON.stringify(pointPropertyRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return pointPropertyResponse;
  }

  public async postGetRelativeFacility(facilityTag: string, relativeFacilityRequest: RelativeFacilityRequest) {
    console.log(JSON.stringify(relativeFacilityRequest, null, 2));
    let relativeFacilityResponse: RelativeFacilityResponse = await this.http.post<RelativeFacilityResponse>(this.buildUrl(`api/v1/facilities/${facilityTag}/relatives`),
      JSON.stringify(relativeFacilityRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return relativeFacilityResponse;
  }

  public async postGetHistoryRollupMinute(pointTag: string, historyRollupMinuteRequest: HistoryRollupMinuteRequest) {
    console.log(JSON.stringify(historyRollupMinuteRequest, null, 2));
    let historyRollupResponse: HistoryRollupResponse = await this.http.post<HistoryRollupResponse>(this.buildUrl(`api/v1/points/${pointTag}/history/rollups/minutes`),
      JSON.stringify(historyRollupMinuteRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return historyRollupResponse;
  }

  public async postGetHistoryRollupHour(pointTag: string, historyRollupHourRequest: HistoryRollupHourRequest) {
    console.log(JSON.stringify(historyRollupHourRequest, null, 2));
    let historyRollupResponse: HistoryRollupResponse = await this.http.post<HistoryRollupResponse>(this.buildUrl(`api/v1/points/${pointTag}/history/rollups/hours`),
      JSON.stringify(historyRollupHourRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return historyRollupResponse;
  }

  public async postGetHistoryRollupDay(pointTag: string, historyRollupDayRequest: HistoryRollupDayRequest) {
    console.log(JSON.stringify(historyRollupDayRequest, null, 2));
    let historyRollupResponse: HistoryRollupResponse = await this.http.post<HistoryRollupResponse>(this.buildUrl(`api/v1/points/${pointTag}/history/rollups/days`),
      JSON.stringify(historyRollupDayRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return historyRollupResponse;
  }


  private buildUrl(relPath: string): string {
    let baseUrl = this.baseUrl  + "/cygnet";
    return baseUrl + "/" + relPath;
  }

  public async login(): Promise<boolean> {
    try {
      this.authToken = await this.http.get<string>(this.baseUrl + "/clientloginapi/api/login", { withCredentials: true }).toPromise();
      return true;
    } catch (err) {
      console.log("Failed to get authentication token:" + err);
      return false;
    }
  }

  public async getAuthenticationToken(): Promise<string> {
    try {
      return await this.http.get<string>(this.baseUrl + "/clientloginapi/api/login", { withCredentials: true }).toPromise();
    } catch (err) {
      console.log("Failed to get authentication token:" + err);
      return null;
    }
  }

  private makeHeaders(): HttpHeaders { 
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("X-WFT-AuthToken", this.authToken);
    headers = headers.set("X-WFT-CygNetDomain", this.domain.toString());
    return headers;
  }

  private makePostHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("Content-Type", "Application/json");
    headers = headers.set("X-WFT-AuthToken", this.authToken);
    headers = headers.set("X-WFT-CygNetDomain", this.domain.toString());
    return headers;
  }

}
