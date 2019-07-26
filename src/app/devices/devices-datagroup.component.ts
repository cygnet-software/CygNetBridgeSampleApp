import {Component, OnInit, ViewEncapsulation} from "@angular/core"
import { Message, SelectItem } from 'primeng/api';
import { CygNetApiService } from "../core/cygnet-api.service";
import { DataGroupTransactionOptions, GetDatagroupTransactionsRequest } from "../models/get-datagroup-transactions-request";

@Component({
    selector:"app-devices-datagroup",
    templateUrl:"./devices-datagroup.component.html",
    styleUrls:["./devices-datagroup.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class DevicesDataGroupComponent implements OnInit {
    
    public DEVICE_SERVICE_ERROR: string = "Please provide a device site service(DDS).";

    public errorMessages: Message[] = [];
    public growlMessages: Message[] = [];
    public deviceSiteService: string;
    public deviceId: string;
    public dataGroupType: string;
    public dataGroupOrd: number;
    public isPopulated: boolean;
    public dataGroupTransactions : any[] ;
    public loading: boolean = false;
    public dataGroupOption: DataGroupTransactionOptions;
    public dataGroupOptions: SelectItem[] = [];
    public selectedTransaction: any[] = [];
    public showDetail: boolean;

    ngOnInit(): void {
    }

    constructor(private cygNet: CygNetApiService) {
        this.dataGroupOptions = [{label:"No Data",value:DataGroupTransactionOptions.NoData},
                                {label:"With Data",value:DataGroupTransactionOptions.WithData},
                                {label:"With Data and Reference",value:DataGroupTransactionOptions.WithDataAndRefs}]
    }

   
 
    public async getTransactions(): Promise<void>{
        if(!this.validateLogin())
        {
            return;
        }
        if(!this.validate())
        {
            return ;
        }
        this.loading = true;
        let getTransactionsRequest = new GetDatagroupTransactionsRequest();
        getTransactionsRequest.siteService = this.deviceSiteService;

        getTransactionsRequest.deviceId = this.deviceId;
        getTransactionsRequest.dataGroupType = this.dataGroupType;
        getTransactionsRequest.dataGroupOrdinal = this.dataGroupOrd;
        getTransactionsRequest.options = this.dataGroupOption;

        try{
            let getTransactionResponse = await this.cygNet.getDataGroupTransactions(getTransactionsRequest);
            this.dataGroupTransactions = getTransactionResponse.transactions;
            this.isPopulated = true;
            this.clearMessages();
        }
        catch(e)
        {
            this.showGrowl({severity:'error', summary:'Error getting transactions', detail: e.error.message||e.error});
        }
        this.loading = false;
    }
      
    public openTransactionDetails(index:number)
    {
        this.showDetail = true;
        let selection = this.dataGroupTransactions[index];
        this.selectedTransaction=[];
        for(let property in selection.header)
        {
            this.selectedTransaction.push({key:property , value:selection.header[property]});
        }
        this.selectedTransaction.push({key:"transactionDataXml",value:selection.transactionDataXml});

    }

    private validate(){
        
        if(!this.deviceSiteService)
        {
            this.showError(this.DEVICE_SERVICE_ERROR);
            return false;
        }
       
        return true;
    }

    private validateLogin(){
        if (!this.cygNet.isLoggedIn()) {
            this.showError("You are not logged in, please log in.");
            return false;
        }
        if (!this.cygNet.isDomainSet()) {
            this.showError("You have not specified a domain, please do so.");
            return false;
        }
        return true;
    }

    private showError(message: string) {
        this.errorMessages = [];
        this.errorMessages.push({ severity: 'error', summary: message });
    }

    private showGrowl(message: Message){
        this.growlMessages.push(message);
        setTimeout(() => {
            this.growlMessages =[];
        }, 3000);
    }
    public clearMessages(){
        this.growlMessages =[];
        this.errorMessages = [];
    }

}
