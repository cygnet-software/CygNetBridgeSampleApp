import { AlarmId } from "./alarms-get-request";

export class AcknowledgeAlarmsResponse{
    alarmAckErrors: AlarmResponseError [];
}

export class AlarmResponseError{
    alarmId:AlarmId;
    error:String;
}