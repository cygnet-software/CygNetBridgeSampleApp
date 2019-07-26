import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message } from 'primeng/api';
import { PointPropertyRequest } from '../models/point-property-request';
import { CygNetApiService } from '../core/cygnet-api.service';
import { PointPropertyResponse } from '../models/point-property-response';

@Component({
  selector: 'app-point-property',
  templateUrl: './point-property.component.html',
  styleUrls: ['./point-property.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PointPropertyComponent implements OnInit {

  public messages: Message[] = [];
  public pointPropertyRequest: PointPropertyRequest;
  public pointPropertyResponse: PointPropertyResponse;

  public inProgress: boolean = false;

  constructor(private cygNet: CygNetApiService) {
    this.pointPropertyRequest = new PointPropertyRequest();
    this.pointPropertyResponse = new PointPropertyResponse();
  }

  ngOnInit() {
  }


  public async getProperties() {
    if (!this.cygNet.isLoggedIn()) {
      this.showError("You are not logged in, please log in.");
      return;
    }
    if (!this.cygNet.isDomainSet()) {
      this.showError("You have not specified a domain, please do so.");
      return;
    }

    this.inProgress = true;
    this.pointPropertyResponse = await this.cygNet.getPointProperty(this.pointPropertyRequest);
    this.inProgress = false;
  }


  public addPointTag(pointTag: string) {
    this.pointPropertyRequest.pointTags.push(pointTag);
  }

  public addProperty(property: string) {
    this.pointPropertyRequest.properties.push(property);
  }

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }

}
