import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message } from 'primeng/api';
import { CygNetApiService } from '../core/cygnet-api.service';
import { AlarmRecord } from '../models/alarms-get-response';
import { GetAlarmsRequest, AlarmId} from '../models/alarms-get-request';
import { AcknowledgeAlarmsRequest } from '../models/alarms-ack-request';
import { ClearAlarmsRequest } from '../models/alarms-clear-request';

@Component({
  selector: 'app-base-alarms',
  templateUrl: './base-alarms.component.html',
  styleUrls: ['./base-alarms.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BaseAlarmsComponent implements OnInit {
  public CAS_ERROR: string = "Please provide an alarms site service(CAS).";

  public errorMessages: Message[] = [];
  public successMessages: Message[] = [];
  public alarms: AlarmRecord[];
  public isPopulated: boolean;
  public selectedAlarms: AlarmRecord[];
  public siteService: string;
  public loading: boolean = false;
  public canClearAlarm: boolean = false;

  constructor(private cygNet: CygNetApiService) { 
    this.selectedAlarms = new Array<AlarmRecord>();
    this.siteService = "";
  }
  
  ngOnInit() {
  }

  public alarmSelected(event){
    this.canClearAlarm = this.canClearAlarm || (event.data.isAcknowledged ? true : false);

  }

  public alarmUnselected(event){
    var item =  this.selectedAlarms.find (function(item)   {
      return item.isAcknowledged;
    });
    if(item) {
      this.canClearAlarm = true;
    }
    else{
      this.canClearAlarm = false;
    }
  }

  public getAlarmClasses(alarm:AlarmRecord)
  {
    let alarmClasses:string[] = [];
    let classToSet :string;
    for (const itemStatus in alarm.pointValue.status) {
     
        const element = alarm.pointValue.status[itemStatus].toString();
        switch(element)
        {
          case "ConfigurableBit5":
            alarmClasses.push("high_alarm");
            break;
          case "ConfigurableBit4":
            alarmClasses.push("high_warning");
            alarm.alarmCondition = "High Warning";
            break;
          case "ConfigurableBit3":
            alarmClasses.push("low_warning");
            alarm.alarmCondition = "Low Warning";
            break;
          case "ConfigurableBit2":
            alarmClasses.push("low_alarm");
            break;
          default:
            break;
        }
     
    }

    if(alarmClasses.length > 1){
      if(alarmClasses.indexOf("high_alarm") >= 0)
      {
        classToSet = "high_alarm";
        alarm.alarmCondition = "High Alarm";
      }
      else if (alarmClasses.indexOf("low_alarm") >= 0)
      {
        classToSet = "low_alarm";
        alarm.alarmCondition = "Low Alarm";
      }
    }
    else {
      classToSet = alarmClasses[0];
    }
    return classToSet;
  }
  
  public async getAlarms(siteService?: string): Promise<void> {
    this.selectedAlarms = new Array<AlarmRecord>();
    if(!this.verifyLoginAndDomain())
    {
      return ;
    }

    if(!siteService && !this.siteService)
    {
      this.showError(this.CAS_ERROR);
      return;
    }
    else if(siteService && siteService != this.siteService)
    {
      this.siteService = siteService;
    }
    this.loading = true;
    let getAlarmsRequest = new GetAlarmsRequest() ;
    getAlarmsRequest.siteService = this.siteService;
    
    let getAlarmsResponse = await this.cygNet.getAlarms(getAlarmsRequest);

    this.alarms = getAlarmsResponse.alarmRecords;
    this.isPopulated = true;
    this.loading = false;
  }

  public async ackAlarms(alarms: AlarmRecord[]): Promise<void>{
    if(!this.verifyLoginAndDomain())
    {
      return ;
    }
    if(!this.siteService)
    {
      this.showError(this.CAS_ERROR);
      return;
    }

    let ackAlarmsRequest = new AcknowledgeAlarmsRequest();
    let alarmsToAck = new Array<AlarmId>() ;
    alarms.forEach(alarm => {
        alarmsToAck.push({pointTag:alarm.pointTag,alarmRecordVersion:alarm.alarmRecordVersion});
    });
    ackAlarmsRequest.siteService = this.siteService;
    ackAlarmsRequest.alarmIds = alarmsToAck;

    let ackAlarmsResponse = await this.cygNet.acknowledgeAlarms(ackAlarmsRequest);
    
    if(ackAlarmsResponse.alarmAckErrors && ackAlarmsResponse.alarmAckErrors.length > 0){
      ackAlarmsResponse.alarmAckErrors.forEach(alarmError => {
        this.showError("Failed to Acknowledge. \n" + alarmError.alarmId.pointTag + ". "+alarmError.error);
      });
    }
    if(alarmsToAck.length - ackAlarmsResponse.alarmAckErrors.length >0)
    {
      this.showSuccess("Acknowleged alarms - " + (alarmsToAck.length - ackAlarmsResponse.alarmAckErrors.length));
    }
    this.getAlarms();
  }

  public async clearAlarms(alarms: AlarmRecord[], force: boolean): Promise<void>{
    if(!this.verifyLoginAndDomain())
    {
      return ;
    }
    
    if(!this.siteService)
    {
      this.showError(this.CAS_ERROR);
      return;
    }

    let clearAlarmsRequest = new ClearAlarmsRequest();
    let alarmsToClear = new Array<AlarmId>() ;
    alarms.forEach(alarm => {
        alarmsToClear.push({pointTag:alarm.pointTag,alarmRecordVersion:alarm.alarmRecordVersion});
    });
    clearAlarmsRequest.siteService = this.siteService;
    clearAlarmsRequest.alarmIds = alarmsToClear;

    let clearAlarmsResponse = await this.cygNet.clearAlarms(clearAlarmsRequest, force);
    let clearAlarmErrors = clearAlarmsResponse.alarmClearErrors;
    let clearAlarmErrorsLength = clearAlarmErrors.length;
    if(clearAlarmErrors && clearAlarmErrorsLength > 0){
      clearAlarmsResponse.alarmClearErrors.forEach(alarmError => {
        this.showError("Failed to Clear. \n" + alarmError.alarmId.pointTag + ". "+alarmError.error);
      });
    }
    if(alarmsToClear.length - clearAlarmErrorsLength >0)
    {
      this.showSuccess("Cleard alarms - " + (alarmsToClear.length - clearAlarmErrorsLength));
    }
    this.getAlarms();
  }

  private verifyLoginAndDomain(){
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
    this.errorMessages.push({ severity: 'error', summary: message });
  }

  private showSuccess(message: string){
    this.successMessages.push({ severity: 'success', summary: message });
  }
}
