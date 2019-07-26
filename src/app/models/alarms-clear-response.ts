import { AlarmResponseError } from "./alarms-ack-response";


//This is same as AckAlarmsResponse. Created new class just for namesake.
export class ClearAlarmsResponse{
    alarmClearErrors: AlarmResponseError [];
}
