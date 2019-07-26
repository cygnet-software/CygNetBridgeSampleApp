import { AlarmId } from "./alarms-get-request";


//This is same as AckAlarmsRequest. Created new class just for namesake.
export class ClearAlarmsRequest{
    siteService: String;
    alarmIds: AlarmId [];
}
