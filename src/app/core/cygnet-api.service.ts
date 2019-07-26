import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { PointValueResponse } from '../models/point-value-response';
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
import { GetAlarmsRequest } from '../models/alarms-get-request';
import { GetAlarmsResponse } from '../models/alarms-get-response';
import { AcknowledgeAlarmsRequest } from '../models/alarms-ack-request';
import { AcknowledgeAlarmsResponse } from '../models/alarms-ack-response';
import { ClearAlarmsRequest } from '../models/alarms-clear-request';
import { ClearAlarmsResponse } from '../models/alarms-clear-response';
import { GetNotesRequest } from '../models/notes-get-request';
import { GetNotesResponse } from '../models/notes-get-response';
import { NoteUpdateRequest } from '../models/note-update-request';
import { NoteUpdateResponse } from '../models/note-update-response';
import { NoteCreateRequest } from '../models/note-create-request';
import { NoteCreateResponse } from '../models/note-create-response';
import { GetActiveNoteTypesResponse } from '../models/get-active-note-types-response';
import { GetDatagroupTransactionsRequest } from '../models/get-datagroup-transactions-request';
import { GetDatagroupTransactionsResponse } from '../models/get-datagroup-transactions-response';
import { SendDatagroupTransactionsRequest } from '../models/send-datagroup-transactions-request';
import { SendDatagroupTransactionsResponse } from '../models/send-datagroup-transactions-response';
import { PollDatagroupRequest } from '../models/poll-datagroup-request';
import { PollDatagroupResponse } from '../models/poll-datagroup-response';
import { CommandName } from 'protractor';
import { CommandInfoResponse } from '../models/command-info-response';
import { SendCommandRequest } from '../models/send-command-request';


@Injectable({
  providedIn: 'root'
})
export class CygNetApiService {
  // Baseurl is the start of the url for your webserver.  This only needs to be settable if you're using your app to
  // be able to hit a variety of web servers.  Otherwise this is easily hardcoded. 
  private baseUrl: string = "http://localhost";

  private authToken: string;
  // Like Baseurl this can be hardcoded if you're only using a singleton.  
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

  // You only need to use this if you're using various bridge servers.
  public setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
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

  public async getFacilityTags(facilityTagRequest: FacilityFilterTagRequest) {
    console.log(JSON.stringify(facilityTagRequest, null, 2));
    let response: FacilityFilterTagResponse = await this.http.post<FacilityFilterTagResponse>(this.buildUrl(`api/v1/facilities/tags`),
      JSON.stringify(facilityTagRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return response;
  }

  public async getPointTagsByFilter(pointTagRequest: PointTagFilterRequest) {
    let pointTagResponse: PointTagFilterResponse = await this.http.post<PointTagFilterResponse>(this.buildUrl(`api/v1/points/tags`),
      JSON.stringify(pointTagRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return pointTagResponse;
  }

  public async getCurrentValueByPointTag(pointTag: string) {
    let realTimeEntry: PointValueResponse = await this.http.get<PointValueResponse>(this.buildUrl(`api/v1/points/values/${pointTag}`),
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

  public async getRealtimeValues(realtimeRequest: RealtimeRequest) {
    console.log(JSON.stringify(realtimeRequest, null, 2));
    let realtimeResponse: RealtimeResponse = await this.http.post<RealtimeResponse>(this.buildUrl(`api/v1/points/currentValues`),
      JSON.stringify(realtimeRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return realtimeResponse;
  }

  public async getRealtimeValuesLightweight(realtimeRequest: RealtimeRequest) {
    console.log(JSON.stringify(realtimeRequest, null, 2));
    let realtimeResponse: RealtimeResponse = await this.http.post<RealtimeResponse>(this.buildUrl(`api/v1/points/currentValues`),
      JSON.stringify(realtimeRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return realtimeResponse;
  }

  public async getPointProperty(pointPropertyRequest: PointPropertyRequest) {
    console.log(JSON.stringify(pointPropertyRequest, null, 2));
    let pointPropertyResponse: PointPropertyResponse = await this.http.post<PointPropertyResponse>(this.buildUrl(`api/v1/points/properties`),
      JSON.stringify(pointPropertyRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return pointPropertyResponse;
  }

  public async getRelativeFacility(facilityTag: string, relativeFacilityRequest: RelativeFacilityRequest) {
    console.log(JSON.stringify(relativeFacilityRequest, null, 2));
    let relativeFacilityResponse: RelativeFacilityResponse = await this.http.post<RelativeFacilityResponse>(this.buildUrl(`api/v1/facilities/${facilityTag}/relatives`),
      JSON.stringify(relativeFacilityRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return relativeFacilityResponse;
  }

  public async getHistoryRollupMinute(pointTag: string, historyRollupMinuteRequest: HistoryRollupMinuteRequest) {
    console.log(JSON.stringify(historyRollupMinuteRequest, null, 2));
    let historyRollupResponse: HistoryRollupResponse = await this.http.post<HistoryRollupResponse>(this.buildUrl(`api/v1/points/${pointTag}/history/rollups/minutes`),
      JSON.stringify(historyRollupMinuteRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return historyRollupResponse;
  }

  public async getHistoryRollupHour(pointTag: string, historyRollupHourRequest: HistoryRollupHourRequest) {
    console.log(JSON.stringify(historyRollupHourRequest, null, 2));
    let historyRollupResponse: HistoryRollupResponse = await this.http.post<HistoryRollupResponse>(this.buildUrl(`api/v1/points/${pointTag}/history/rollups/hours`),
      JSON.stringify(historyRollupHourRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return historyRollupResponse;
  }

  public async getHistoryRollupDay(pointTag: string, historyRollupDayRequest: HistoryRollupDayRequest) {
    console.log(JSON.stringify(historyRollupDayRequest, null, 2));
    let historyRollupResponse: HistoryRollupResponse = await this.http.post<HistoryRollupResponse>(this.buildUrl(`api/v1/points/${pointTag}/history/rollups/days`),
      JSON.stringify(historyRollupDayRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return historyRollupResponse;
  }

  public async getAlarms(getAlarmsRequest: GetAlarmsRequest) {
    console.log(JSON.stringify(getAlarmsRequest, null, 2));
    let getAlarmsResponse: GetAlarmsResponse = await this.http.post<GetAlarmsResponse>(this.buildUrl(`api/v1/alarms`),
      JSON.stringify(getAlarmsRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return getAlarmsResponse;
  }

  public async acknowledgeAlarms(acknowledgeAlarmsRequest: AcknowledgeAlarmsRequest)
  {
    console.log(JSON.stringify(acknowledgeAlarmsRequest, null, 2));
    let acknowledgeAlarmsResponse: AcknowledgeAlarmsResponse = await this.http.post<AcknowledgeAlarmsResponse>(this.buildUrl(`api/v1/alarms/acknowledge`),
      JSON.stringify(acknowledgeAlarmsRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return acknowledgeAlarmsResponse;
  }

  public async clearAlarms(clearAlarmsRequest: ClearAlarmsRequest, force: boolean)
  {
    console.log(JSON.stringify(clearAlarmsRequest, null, 2));
    let clearAlarmsResponse: ClearAlarmsResponse = await this.http.post<ClearAlarmsResponse>(this.buildUrl(`api/v1/alarms/clear?force=${force}`),
      JSON.stringify(clearAlarmsRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return clearAlarmsResponse;
  }

  public async getNotes(getNotesRequest: GetNotesRequest) {
    console.log(JSON.stringify(getNotesRequest, null, 2));
    let getNotesResponse: GetNotesResponse = await this.http.post<GetNotesResponse>(this.buildUrl(`api/v1/notes`),
      JSON.stringify(getNotesRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return getNotesResponse;
  }

  public async getActiveNoteTypes(siteService: string) {
    let getNoteTypesResponse: GetActiveNoteTypesResponse = await this.http.get<GetActiveNoteTypesResponse>(this.buildUrl(`api/v1/notes/types?siteService=${siteService}`),
      { headers: this.makeHeaders() }
    ).toPromise();
    return getNoteTypesResponse;
  }

  public async updateNote(updateNoteRequest: NoteUpdateRequest, noteTag: string) {
    console.log(JSON.stringify(updateNoteRequest, null, 2));
    let updateNoteResponse: NoteUpdateResponse;
    
      let url = encodeURI(this.buildUrl("api/v1/notes/") + noteTag);
      updateNoteResponse = await this.http.put<NoteUpdateResponse>(url,
        JSON.stringify(updateNoteRequest),
        { headers: this.makePostHeaders() }
      ).toPromise();
    
    return updateNoteResponse;
  }

  public async createNote(createNoteRequest: NoteCreateRequest) {
    console.log(JSON.stringify(createNoteRequest, null, 2));
    let createNoteResponse: NoteCreateResponse;
    let url = encodeURI(this.buildUrl("api/v1/notes/create"));
    createNoteResponse = await this.http.post<NoteCreateResponse>(url,
        JSON.stringify(createNoteRequest),
        { headers: this.makePostHeaders() }
    ).toPromise();
    return createNoteResponse;
  }

  public async getDataGroupTransactions(transactionRequest: GetDatagroupTransactionsRequest) {
    console.log(JSON.stringify(transactionRequest, null, 2));
    let getTransactionsResponse: GetDatagroupTransactionsResponse = await this.http.post<GetDatagroupTransactionsResponse>(this.buildUrl(`api/v1/devices/datagroups/gettransactions`),
      JSON.stringify(transactionRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return getTransactionsResponse;
  }

  public async sendDataGroupTransactions(sendTransactionRequest: SendDatagroupTransactionsRequest) {
    console.log(JSON.stringify(sendTransactionRequest, null, 2));
    let sendTransactionsResponse: SendDatagroupTransactionsResponse = await this.http.post<SendDatagroupTransactionsResponse>(this.buildUrl(`api/v1/devices/datagroups/sendTransactions`),
      JSON.stringify(sendTransactionRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return sendTransactionsResponse;
  }

  public async pollDataGroup(pollDataGroupRequest: PollDatagroupRequest) {
    console.log(JSON.stringify(pollDataGroupRequest, null, 2));
    let pollDataGroupResponse: PollDatagroupResponse = await this.http.post<PollDatagroupResponse>(this.buildUrl(`api/v1/devices/datagroups/poll`),
      JSON.stringify(pollDataGroupRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
    return pollDataGroupResponse;
  }

  public async getCommandInfo(facilityTag: string, commandName: string, getDetails: boolean) {
    let response: CommandInfoResponse = await this.http.get<CommandInfoResponse>(this.buildUrl(`api/v1/devices/getCommandInfo?facilityTag=${facilityTag}&commandName=${commandName}&getDetails=${getDetails}`),
        { headers: this.makeHeaders() } ).toPromise();
    return response;
  }

  public async sendCommand(sendCommandRequest: SendCommandRequest) {
    console.log(JSON.stringify(sendCommandRequest, null, 2));
    await this.http.post(this.buildUrl(`api/v1/devices/sendCommand`),
      JSON.stringify(sendCommandRequest),
      { headers: this.makePostHeaders() }
    ).toPromise();
  }


  private buildUrl(relPath: string): string {
    let baseUrl = this.baseUrl  + "/cygnet";
    return baseUrl + "/" + relPath;
  }

  public async login(): Promise<number> {
    try {
      this.authToken = await this.http.get<string>(this.baseUrl + "/clientloginapi/api/login", { withCredentials: true }).toPromise();
      return 200;
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 403) {
          // Forbidden from the login API indicates that this user has registered for two-factor authentication,
          // and your request was missing the two-factor authentication code. The user should be prompted for the
          // two-factor authentication code (from Google Authenticator or any other authenticator app) and the login
          // request should be re-sent with the code in the header "X-WFT-AuthCode"
          console.log("Missing or incorrect two-factor authentication code");
        } else {
          console.log("Failed to get authentication token:" + err);
        }

        return err.status;
      }
    }
  }

  public async twoFactorLogin(twoFactorCode: string): Promise<number> {
    try {
      let withCredentials: boolean = true;
      let headers = new HttpHeaders({ "X-WFT-AuthCode": twoFactorCode });

      this.authToken = await this.http.get<string>(this.baseUrl + "/clientloginapi/api/login", { headers, withCredentials }).toPromise();
      return 200;
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 403) {
          // Forbidden from the login API indicates that this user has registered for two-factor authentication,
          // and the request was missing or contained the incorrect two-factor authentication code.
          // The code should be in the header "X-WFT-AuthCode"
          console.log("Missing or incorrect two-factor authentication code");
        } else {
          console.log("Failed to get authentication token:" + err);
        }

        return err.status;
      }
    }
  }

  public async getTwoFactorQRCode(): Promise<string> {
    try {
      return await this.http.get<string>(this.baseUrl + "/clientloginapi/api/login/tfa-qr", { withCredentials: true }).toPromise();
    } catch (err) {
      console.log("Failed to get two-factor authentication pre-shared-key: " + err);
      return null;
    }
  }

  public async confirmTwoFactorRegistration(verificationCode: string): Promise<number> {
    try {
      let withCredentials: boolean = true;
      let headers: HttpHeaders = new HttpHeaders({
        "X-WFT-AuthCode": verificationCode
      });

      await this.http.get(this.baseUrl + "/clientloginapi/api/login/tfa-confirm", { headers, withCredentials }).toPromise();
      return 204;
    } catch (err) {
      if (err.status == 403) {
        // Forbidden from this API indicates that the code did not match, either because it was missing,
        // wrong, or the time windows had expired in which case the client should prompt user for a new code
        // and retry the confirmation step.
        console.log("Missing or incorrect two-factor authentication code");
      } else {
        console.log("Confirmation of two-factor authentication registration failed:" + err);
      }

      return err.status;
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
