import {Component, OnInit, ViewEncapsulation} from "@angular/core"
import { Message } from 'primeng/api';
import { CygNetApiService } from "../core/cygnet-api.service";
import { SendCommandRequest } from "../models/send-command-request";

@Component({
    selector:"app-devices-command",
    templateUrl:"./devices-command.component.html",
    styleUrls:["./devices-command.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class DevicesCommandComponent implements OnInit {
    
    public DEVICE_SERVICE_ERROR: string = "Please provide a device site service(DDS).";

    public errorMessages: Message[] = [];
    public growlMessages: Message[] = [];
    public facilityTag: string;
    public commandName: string;
    public getDetails: boolean = false;
    public commandInfoXml: string;

    public sendCommand_facilityTag: string;
    public sendCommand_command: string;
    public sendCommand_parameters: string = "";
    public sendCommand_statusPointId: string = "";

    public loading: boolean = false;
    public showDetail: boolean = false;

    ngOnInit(): void {
    }

    constructor(private cygNet: CygNetApiService) {
    }

    public async getCommandInfo(): Promise<void>{
        if(!this.validateLogin())
        {
            return;
        }

        this.loading = true;
       
        try{
            let commandInfoResponse = await this.cygNet.getCommandInfo(this.facilityTag,this.commandName,this.getDetails);
            this.commandInfoXml = commandInfoResponse.commandInfoXML;
            this.showDetail = true;
        }
        catch(e)
        {
            this.showGrowl({severity:'error', summary:'Error getting command info', detail: e.error.message||e.error});
        }
        this.loading = false;
    }

    public async sendCommand(): Promise<void>{
        if(!this.validateLogin())
        {
            return;
        }

        this.loading = true;
       
        try{
            let sendCommandRequest = new SendCommandRequest();
            sendCommandRequest.facilityTag = this.sendCommand_facilityTag;
            sendCommandRequest.command = this.sendCommand_command;
            sendCommandRequest.parameters = this.sendCommand_parameters;
            sendCommandRequest.statusPointId = this.sendCommand_statusPointId;
            await this.cygNet.sendCommand(sendCommandRequest);
            this.showGrowl({severity:'success', summary:'Command sent successfully!', detail:""});
        }
        catch(e)
        {
            this.showGrowl({severity:'error', summary:'Error sending command', detail: e.error.message||e.error});
        }
        this.loading = false;
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
