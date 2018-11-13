export class HistoryRollupMinuteRequest {
  public minuteRollupInterval: MinuteIntervals;
  public start: string;
  public end: string;
  public rollupType: HistoricalRollupType;
}

export class HistoryRollupHourRequest {
  public hourRollupInterval: HourIntervals;
  public start: string;
  public end: string;
  public rollupType: HistoricalRollupType;
}

export class HistoryRollupDayRequest {
  public dayStartHour: number;
  public start: string;
  public end: string;
  public rollupType: HistoricalRollupType;
}

export enum MinuteIntervals {
  FifteenMinutes = "FifteenMinutes",
  ThirtyMinutes = "ThirtyMinutes",
}

export enum HourIntervals {
  OneHour = "OneHour",
  TwoHours = "TwoHours",
  ThreeHours = "ThreeHours",
  FourHours = "FourHours",
  SixHours = "SixHours",
  EightHours = "EightHours",
  TwelveHours = "TwelveHours",
}

export enum HistoricalRollupType {
  CalculatedWeightedAverage = "CalculatedWeightedAverage",
  CalculatedMean = "CalculatedMean",
  CalculatedMin = "CalculatedMin",
  CalculatedMax = "CalculatedMax",
  CalculatedDelta = "CalculatedDelta",
  CalculatedLast = "CalculatedLast",
  ThinnedMedian = "ThinnedMedian",
  ThinnedMinMax = "ThinnedMinMax",
  ThinnedLast = "ThinLast",
}
