import { Component, OnInit, OnChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { CygNetApiService } from '../core/cygnet-api.service';
import { ServiceResponse, ServiceInfo } from '../models/service-response';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-base-service',
  templateUrl: './base-service.component.html',
  styleUrls: ['./base-service.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseServiceComponent implements OnInit {

    public response: ServiceResponse;
    public services: ServiceInfo[];
    public selectedService: ServiceInfo;
    public loading: boolean = false;
    public isPopulated: boolean = false;
    public messages: Message[] = [];

    constructor(private cygNet: CygNetApiService) { }

    ngOnInit() {
        this.services = new Array<ServiceInfo>();
        this.selectedService = new ServiceInfo();
    }

    public onSelect(services: ServiceInfo[]) {
        this.services = services;
    }

    public async getServices(domain: number): Promise<void> {
        if (!this.cygNet.isLoggedIn()) {
            this.showError("You are not logged in, please log in.");
            return;
        }
        if (!this.cygNet.isDomainSet()) {
            this.showError("You have not specified a domain, please do so.");
            return;
        }
        this.loading = true;
        this.response = await this.cygNet.getServicesForDomain(domain);
        this.services = this.response.services;
        this.loading = false;
        this.isPopulated = true;
    }

    private showError(message: string) {
        this.messages.push({ severity: 'error', summary: message });
    }

}
