import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { CygNetApiService } from '../core/cygnet-api.service';
import { RealtimeRequest } from '../models/realtime-request';
import { RealtimeResponse, RealtimeValuePair, RealtimeValueRecord } from '../models/realtime-response';
import { Subject, Subscription, timer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-realtime-lightweight',
  templateUrl: './realtime-lightweight.component.html',
  styleUrls: ['./realtime-lightweight.component.scss']
})
export class RealtimeLightweightComponent implements OnInit {
  private points: string[];
  public pointTag: string;

  private request: RealtimeRequest;
  private response: RealtimeResponse;

  public lastRequest: Date;

  public gridValues: RealtimeValuePair[];

  public oneSecondClock: Observable<number>;
  public fiveSecondClock: Subject<number>;
  public sub: Subscription;
  public clockValue: number;
  public showTimer: boolean = false;

  public messages: Message[] = [];

  constructor(private cygNet: CygNetApiService) {
    this.gridValues = new Array<RealtimeValuePair>();
    this.points = new Array<string>();
    this.request = new RealtimeRequest();
    this.response = new RealtimeResponse();
    this.fiveSecondClock = new Subject<number>();
    this.oneSecondClock = timer(0, 1000);
    this.oneSecondClock.subscribe(value => this.clockValue = (value % 5));
    this.oneSecondClock.subscribe(value => (value % 5 == 0 ? this.fiveSecondClock.next() : null));
    this.fiveSecondClock.subscribe(value => this.refreshGrid());
  }

  ngOnInit() {
  }

  public addPointTag(): void {
    this.points.push(this.pointTag);
    let valuePair = new RealtimeValuePair();
    valuePair.pointTag = this.pointTag;
    this.gridValues.push(valuePair);
    this.request.PointTags.push(this.pointTag);
  }

  public async getValues() {
    if (!this.cygNet.isLoggedIn()) {
      this.showError("You are not logged in, please log in.");
      return;
    }
    if (!this.cygNet.isDomainSet()) {
      this.showError("You have not specified a domain, please do so.");
      return;
    }

    if (this.sub != null) {
      this.sub.unsubscribe();
    }

    this.showTimer = true;
    this.response = await this.cygNet.postGetRealtimeValues(this.request);
    this.refreshGrid();

    this.lastRequest = new Date();

    this.sub = this.fiveSecondClock.pipe(
      switchMap(() => this.getLightweightValues())
    ).subscribe(res => {
      this.response = res;
      this.refreshGrid();
    });
  }

  private getLightweightValues(): Promise<RealtimeResponse> {
    let newLastRequest = new Date();
    let resp: Promise<RealtimeResponse> = this.cygNet.postGetRealtimeValuesLightweight(this.request, this.lastRequest);
    this.lastRequest = newLastRequest;
    return resp;
  }

  private refreshGrid() {
    let newGridValues = new Array<RealtimeValuePair>();

    this.response.currentValues.forEach(function (value) {
      newGridValues.push(value);
    });

    this.gridValues.forEach(function (value) {
      let found = newGridValues.find(x => x.pointTag == value.pointTag);
      if (found == null) {
        newGridValues.push(value);
      }
    });

    this.gridValues = newGridValues;
  }

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }

}
