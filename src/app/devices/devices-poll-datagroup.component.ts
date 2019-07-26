import {Component, OnInit, ViewEncapsulation} from "@angular/core"
import { Message } from 'primeng/api';
import { CygNetApiService } from "../core/cygnet-api.service";
import { PollDatagroupRequest } from "../models/poll-datagroup-request";

@Component({
    selector:"app-devices-poll-datagroup",
    templateUrl:"./devices-poll-datagroup.component.html",
    styleUrls:["./devices-poll-datagroup.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class DevicesPollDataGroupComponent implements OnInit {
    
    public DEVICE_SERVICE_ERROR: string = "Please provide a device site service(UIS).";

    public errorMessages: Message[] = [];
    public growlMessages: Message[] = [];
    public uisSiteService: string;
    public deviceId: string;
    public dataGroupType: string;
    public dataGroupOrd: number;
    public fromDeviceParameters: string = "";
    public returnTransactionData: boolean = false;
    public maxWaitInMs: number;
    public isPopulated: boolean;
    public transactionData : any[] = [] ;
    public loading: boolean = false;
    public transaction: any[] = [];
    public showDetail: boolean =false;

    ngOnInit(): void {
    }

    constructor(private cygNet: CygNetApiService) {
    }

    public addParameter(parameter: string,value: string){
        if(parameter && value) {
            this.transactionData.push({parameter:parameter,value:value});
         }
         else{
             this.showGrowl({severity:'error', summary:'Please enter parameter and value in pair'});
         }
     }
 
    public async pollDataGroup(): Promise<void>{
        if(!this.validateLogin())
        {
            return;
        }
        if(!this.validate())
        {
            return ;
        }
        this.loading = true;
        let pollDataGroupRequest = new PollDatagroupRequest();
        pollDataGroupRequest.siteService = this.uisSiteService;

        pollDataGroupRequest.deviceId = this.deviceId;
        pollDataGroupRequest.dataGroupType = this.dataGroupType;
        pollDataGroupRequest.ordinal = this.dataGroupOrd;
        pollDataGroupRequest.fromDeviceParameters = this.fromDeviceParameters;
        pollDataGroupRequest.returnTransactionData = this.returnTransactionData;
        pollDataGroupRequest.maxWaitInMs = this.maxWaitInMs;

        try{
            let pollDataGroupResponse = await this.cygNet.pollDataGroup(pollDataGroupRequest);
            this.showGrowl({severity:'success', summary:'Data group polled successfully!',detail:"Success"});

            let selection = pollDataGroupResponse.transaction;
            if(selection)
            {
                this.transaction=[];
                for(let property in selection.header)
                {
                    this.transaction.push({key:property , value:selection.header[property]});
                }
                this.transaction.push({key:"transactionDataXml",value:selection.transactionDataXml});
                this.showDetail = true;
            } 
        }
        catch(e)
        {
            this.showGrowl({severity:'error', summary:'Error polling datagroup.', detail: e.error.message||e.error});
        }
        this.loading = false;
    }

    private validate(){
        
        if(!this.uisSiteService)
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
