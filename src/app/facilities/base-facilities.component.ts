import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { interval, Observable, Subscription, timer, Subject } from 'rxjs';
import { startWith, switchMap } from "rxjs/operators";

import { CygNetApiService } from '../core/cygnet-api.service';
import { FacilityResponse } from '../models/facility-response';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-base-facilities',
  templateUrl: './base-facilities.component.html',
  styleUrls: ['./base-facilities.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseFacilitiesComponent implements OnInit {
  @Input() public facilityTag: string;

  public facility: FacilityResponse;
  public oneSecondClock: Observable<number>;
  public oneHundredSecondClock: Subject<number>;
  public sub: Subscription;
  public clockValue: number;
  public isPopulated: boolean;

  public messages: Message[] = [];

  constructor(private cygNet: CygNetApiService) { }

  ngOnInit() {
    this.facility = new FacilityResponse();
    this.oneSecondClock = timer(0, 1000);
    this.oneHundredSecondClock = new Subject<number>();
    this.oneSecondClock.subscribe(value => this.clockValue = (value % 100));
    this.oneSecondClock.subscribe(value => (value % 100 == 0 ? this.oneHundredSecondClock.next() : null));
    this.isPopulated = false;
  }

  public async getFacility(facilityTag: string): Promise<void> {
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

    this.sub = this.oneHundredSecondClock.pipe(
      switchMap(() => this.cygNet.getFacilityByFacilityTag(facilityTag))
    ).subscribe(res => this.facility = res);

    this.facility = await this.cygNet.getFacilityByFacilityTag(facilityTag);
    this.isPopulated = true;
  }

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }
}
