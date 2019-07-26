
export class GetAlarmsResponse{
    public alarmRecords:AlarmRecord[]

    constructor(){
        this.alarmRecords = new Array<AlarmRecord>();
    }
}


export class AlarmRecord{
    isSuppressed: boolean;
    pointTag:string;
    alarmRecordVersion: string;
    highestAlarmPrioritySinceAck: number;
    highestAlarmPriority: number;
    alarmPriorityCategory: number;
    alarmPriority: number;
    alarmCategory: string;
    pointStatus: PointStatus;
    isHidden: boolean;
    isAcknowledged: boolean;
    isSet: boolean;
    reportedTimestamp: Date;
    pointValue: PointValue;
    alarmCondition: string;
}

export class PointStatus{
    baseStatus: BaseStatusFlags[];
    userStatus: UserStatusFlags[];
}

export class PointValue{
    timestamp: Date;
    value: string;
    alternateValue: string;
    status: BaseStatusFlags[];
    userStatus: UserStatusFlags[];
    pointStatus: PointStatus;
}

export enum BaseStatusFlags{
    Initialized = 1,
    Updated = 2,
    Unreliable = 4,
    ConfigurableBit1 = 8,
    ConfigurableBit2 = 16,
    ConfigurableBit3 = 32,
    ConfigurableBit4 = 64,
    ConfigurableBit5 = 128,
    ConfigurableBit6 = 256,
    ConfigurableBit7 = 512,
    StringData = 1024,
    ConfigurableBit8 = 2048,
    DigitalData = 4096,
    OutputData = 8192,
    ConfigurableBit9 = 16384,
    ConfigurableBit10 = 32768
}

export enum UserStatusFlags{
    UserBit1 = 1,
    UserBit2 = 2,
    UserBit3 = 4,
    UserBit4 = 8,
    UserBit5 = 16,
    UserBit6 = 32,
    UserBit7 = 64,
    UserBit8 = 128,
    UserBit9 = 256,
    UserBit10 = 512,
    UserBit11 = 1024,
    UserBit12 = 2048,
    UserBit13 = 4096,
    UserBit14 = 8192,
    UserBit15 = 16384,
    UserBit16 = 32768,
    PointScheme1 = 65536,
    PointScheme2 = 131072,
    PointScheme3 = 262144,
    PointScheme4 = 524288,
    AlarmPriorityCategory1 = 1048576,
    AlarmPriorityCategory2 = 2097152,
    AlarmPriorityCategory3 = 4194304,
    ExternalValue = 8388608,
    VHSValueEdited = 16777216,
    AlarmSuppressed = 33554432,
    ConfigurableBit11 = 67108864,
    ConfigurableBit12 = 134217728,
    ConfigurableBit13 = 268435456,
    VHSValueDeleted = 536870912,
    ConfigurableBit14 = 1073741824,
    ConfigurableBit15 = 2147483648
}
