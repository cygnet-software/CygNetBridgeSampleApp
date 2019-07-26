import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FacilityFilterTagRequest, FilterCriteria, Filters } from '../models/facility-filter-tag-request';
import { FacilityFilterTagResponse } from '../models/facility-filter-tag-response';
import { SelectItem, Message } from 'primeng/api';
import { CygNetApiService } from '../core/cygnet-api.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-facilities-filter-tag',
    templateUrl: './facilities-filter-tag.component.html',
    styleUrls: ['./facilities-filter-tag.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FacilitiesFilterTagComponent implements OnInit {

    public request: FacilityFilterTagRequest;
    public response: FacilityFilterTagResponse;
    public filters: FilterCriteria[];
    public tags: string[];
    public messages: Message[] = [];

    public comparisonOperator: string;
    public comparisonMethod: string;
    public logicalOperator: string;
    public siteService: string;

    public comparisonOperators: SelectItem[];
    public comparisonMethods: SelectItem[];
    public logicalOperators: SelectItem[];

    public responded: boolean;
    public loading: boolean = false;
    public isPopulated: boolean;
    public json: string;

    constructor(private cygNet: CygNetApiService)
    {
        this.request = new FacilityFilterTagRequest();
        this.response = new FacilityFilterTagResponse();

        this.filters = new Array<FilterCriteria>();
        this.comparisonOperator = "Equal";
        this.comparisonMethod = "String";
        this.logicalOperator = "And";
        this.responded = false;

        this.comparisonOperators = [
            { label: 'Equal', value: 'Equal' },
            { label: 'Not Equal', value: 'NotEqual' },
            { label: 'Greater Than', value: 'GreaterThan' },
            { label: 'Greater Than Or Equal', value: 'GreatThanOrEqual' },
            { label: 'Less Than Or Equal', value: 'LessThanOrEqual' }
        ];

        this.comparisonMethods = [
            { label: 'String', value: 'String' },
            { label: 'Case Insensitive String', value: 'CaseInsensitiveString' },
            { label: 'As Integer', value: 'AsInteger' },
            { label: 'As Floating Point', value: 'AsFloatingPoint' },
            { label: 'As Date Time', value: 'AsDateTime' }
        ]

        this.logicalOperators = [
            { label: 'And', value: 'And' },
            { label: 'Or', value: 'Or' }
        ];
    }

  ngOnInit() {
  }

    public addCriteria(propertyId: string, value: string, comparisonOperator: string, comparisonMethod: string): void {
        let criteria: FilterCriteria = new FilterCriteria();
        criteria.PropertyId = propertyId;
        criteria.Value = value;
        criteria.ComparisonOperator = comparisonOperator;
        criteria.ComparisonMethod = comparisonMethod;

        this.filters.push(criteria);
    }

    public clearCriteria() {
        this.filters = new Array<FilterCriteria>();
    }


    public async getTags() {
        if (!this.cygNet.isLoggedIn()) {
            this.showError("You are not logged in, please log in.");
            return;
        }
        if (!this.cygNet.isDomainSet()) {
            this.showError("You have not specified a domain, please do so.");
            return;
        }

        else {
            this.loading = true;
            this.request.SiteService = this.siteService

            let filter = new Filters();
            filter.Criteria = this.filters;
            if (this.filters.length > 1) {
                filter.LogicalOperator = this.logicalOperator;
            }
            this.request.Filters = new Array<Filters>();
            this.request.Filters.push(filter);

            this.response = await this.cygNet.getFacilityTags(this.request);
            this.loading = false;
            this.isPopulated = true;
        }

    }

    private showError(message: string) {
        this.messages.push({ severity: 'error', summary: message });
    }
}
