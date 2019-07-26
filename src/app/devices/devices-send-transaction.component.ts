import {Component, OnInit, ViewEncapsulation} from "@angular/core"
import { Message } from 'primeng/api';
import { CygNetApiService } from "../core/cygnet-api.service";
import { SendDatagroupTransactionsRequest } from "../models/send-datagroup-transactions-request";

@Component({
    selector:"app-devices-send-transaction",
    templateUrl:"./devices-send-transaction.component.html",
    styleUrls:["./devices-send-transaction.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class DevicesSendTransactionComponent implements OnInit {
    
    public DEVICE_SERVICE_ERROR: string = "Please provide a device site service(UIS).";

    public errorMessages: Message[] = [];
    public growlMessages: Message[] = [];
    public uisSiteService: string;
    public deviceId: string;
    public dataGroupType: string ;
    public dataGroupOrd: number;
    public fromDeviceParameters: string = "";
    public toDeviceParameters: string = "";
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
 
    public async sendTransaction(): Promise<void>{
        if(!this.validateLogin())
        {
            return;
        }
        if(!this.validate())
        {
            return ;
        }
        this.loading = true;
        let sendTransactionsRequest = new SendDatagroupTransactionsRequest();
        sendTransactionsRequest.siteService = this.uisSiteService;

        sendTransactionsRequest.deviceId = this.deviceId;
        sendTransactionsRequest.dataGroupType = this.dataGroupType;
        sendTransactionsRequest.dataGroupOrdinal = this.dataGroupOrd;
        sendTransactionsRequest.dataGroupTransactionData = this.createDataXml(this.transactionData);
        sendTransactionsRequest.fromDeviceParameters = this.fromDeviceParameters;
        sendTransactionsRequest.toDeviceParameters = this.toDeviceParameters;
        sendTransactionsRequest.maxWaitInMs = this.maxWaitInMs;

        try{
            let sendTransactionResponse = await this.cygNet.sendDataGroupTransactions(sendTransactionsRequest);
            this.showGrowl({severity:'success', summary:'Transaction sent successfully!'});
            this.clearMessages();
            let selection = sendTransactionResponse.transactionHeader;
            this.transaction=[];
            for(let property in selection)
            {
                this.transaction.push({key:property , value:selection[property]});
            }
            this.showDetail = true;
        }
        catch(e)
        {
            this.showGrowl({severity:'error', summary:'Error sending transaction.', detail: e.error.message||e.error});
        }
        this.loading = false;
    }
      
    private createDataXml(transactionData:any[]){
        let dataXmlHead = "<dgData>";
        let dataXmlBody= "";
        let dataXmlTail = "</dgData>";
        
        for(let index in transactionData)
        {
            dataXmlBody= dataXmlBody+"<"+transactionData[index].parameter+">"+transactionData[index].value+"</"+transactionData[index].parameter+">"
        }

        return dataXmlHead + dataXmlBody + dataXmlTail;
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
