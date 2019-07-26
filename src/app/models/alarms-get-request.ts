export class GetAlarmsRequest{
    public siteService: string;
    public start?: string;
    public end?: string;
}

export class AlarmId{
    pointTag: string;
    alarmRecordVersion: string;
}
