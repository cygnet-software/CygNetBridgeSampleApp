import { Component, OnInit, Input } from '@angular/core';
import { PointConfigRecord } from '../models/point-config-record';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { CygNetApiService } from '../core/cygnet-api.service';
import { switchMap } from 'rxjs/operators';
import { PointValueRecord } from '../models/point-value-record';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-base-points',
  templateUrl: './base-points.component.html',
  styleUrls: ['./base-points.component.scss']
})
export class BasePointsComponent implements OnInit {
  @Input() public pointTag: string;

  public clockValue: number;
  public pointConfigRecord: PointConfigRecord;

  public messages: Message[] = [];

  constructor(private cygNet: CygNetApiService) { }

  ngOnInit() {
    this.pointConfigRecord = new PointConfigRecord();
  }

  public async getPointConfig(pointTag: string): Promise<void> {
    if (!this.cygNet.isLoggedIn()) {
      this.showError("You are not logged in, please log in.");
      return;
    }
    if (!this.cygNet.isDomainSet()) {
      this.showError("You have not specified a domain, please do so.");
      return;
    }

    this.pointConfigRecord = await this.cygNet.getPointConfigRecordByPointTag(pointTag);

  }

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }
}
