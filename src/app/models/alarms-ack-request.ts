import { AlarmId } from "./alarms-get-request";


export class AcknowledgeAlarmsRequest{
    siteService: String;
    alarmIds: AlarmId [];
}
