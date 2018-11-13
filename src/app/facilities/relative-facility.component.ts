import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { CygNetApiService } from '../core/cygnet-api.service';
import { RelativeFacilityRequest } from '../models/relative-facility-request';
import { RelativeFacilityResponse, RelationshipPair } from '../models/relative-facility-response';

@Component({
  selector: 'app-relative-facility',
  templateUrl: './relative-facility.component.html',
  styleUrls: ['./relative-facility.component.scss']
})
export class RelativeFacilityComponent implements OnInit {

  private points: string[];
  public facilityTag: string;
  public relationships: string[];
  public relationship: string;

  public relationshipPairs: RelationshipPair[];

  private request: RelativeFacilityRequest;
  private response: RelativeFacilityResponse;

  public messages: Message[] = [];

  constructor(private cygNet: CygNetApiService) {
    this.relationships = new Array<string>();
    this.request = new RelativeFacilityRequest();
    this.response = new RelativeFacilityResponse();
    this.relationshipPairs = new Array<RelationshipPair>();
  }

  ngOnInit() {
  }

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }

  public addRelationship(): void {
    this.request.Relatives.push(this.relationship);
    this.relationships.push(this.relationship);
    let newRelationshipPair = new RelationshipPair();
    newRelationshipPair.relationship = this.relationship;
    this.relationshipPairs.push(newRelationshipPair);
  }

  public async getRelationships(): Promise<void> {
    if (!this.cygNet.isLoggedIn()) {
      this.showError("You are not logged in, please log in.");
      return;
    }
    if (!this.cygNet.isDomainSet()) {
      this.showError("You have not specified a domain, please do so.");
      return;
    }

    this.response = await this.cygNet.postGetRelativeFacility(this.facilityTag, this.request);
    this.refreshGrid();
  }

  private refreshGrid(): void {
    let newGridValues = new Array<RelationshipPair>();

    console.log(this.response);

    this.response.relativeFacilities.forEach(function (value) {
      newGridValues.push(value);
    });

    this.relationshipPairs.forEach(function (value) {
      let found = newGridValues.find(x => x.relationship == value.relationship);
      if (found == null) {
        newGridValues.push(value);
      }
    });

    this.relationshipPairs = newGridValues;
  }

}
