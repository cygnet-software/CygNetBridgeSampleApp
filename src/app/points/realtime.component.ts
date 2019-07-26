import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message } from 'primeng/api';
import { CygNetApiService } from '../core/cygnet-api.service';
import { RealtimeRequest } from '../models/realtime-request';
import { RealtimeResponse, RealtimeValuePair } from '../models/realtime-response';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RealtimeComponent implements OnInit {

  private points: string[];
  public pointTag: string;

  private request: RealtimeRequest;
  private response: RealtimeResponse;

  public messages: Message[] = [];
  
  public loading: boolean = false;

  constructor(private cygNet: CygNetApiService)
  {
    this.points = new Array<string>();
    this.request = new RealtimeRequest();
    this.response = new RealtimeResponse();
  }

  ngOnInit() {
  }

  public addPointTag(): void {
    this.points.push(this.pointTag);
    let valuePair = new RealtimeValuePair();
    valuePair.pointTag = this.pointTag;
    this.response.currentValues.push(valuePair);
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
    this.loading = true;
    this.request.PointTags = this.points;

    this.response = await this.cygNet.getRealtimeValues(this.request);
    this.loading = false;
  }

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }

}
