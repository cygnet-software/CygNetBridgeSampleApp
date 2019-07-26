import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CygNetApiService } from '../core/cygnet-api.service';
import { Message, SelectItem } from 'primeng/api';
import { HistoryResponse } from '../models/history-response';
import { UIChart } from 'primeng/chart';
import { HistoryRollupMinuteRequest, HistoryRollupHourRequest, HistoryRollupDayRequest, MinuteIntervals, HourIntervals, HistoricalRollupType } from '../models/history-rollup-request';
import { HistoryRollupResponse } from '../models/history-rollup-response';

@Component({
  selector: 'app-history-rollup',
  templateUrl: './history-rollup.component.html',
  styleUrls: ['./history-rollup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryRollupComponent implements OnInit {

  public pointTag: string;

  public minuteRequest: HistoryRollupMinuteRequest;
  public hourRequest: HistoryRollupHourRequest;
  public dayRequest: HistoryRollupDayRequest;

  public intervals: SelectItem[];
  public selectedInterval: HistoryRollupType;

  public response: HistoryRollupResponse;

  public startDate: Date;
  public endDate: Date;

  public dayStartHour: number;
  public minuteRollupInterval: MinuteIntervals;
  public hourRollupInterval: HourIntervals;

  public minuteIntervals: SelectItem[];
  public hourIntervals: SelectItem[];

  public chartData: any;
  public chartOptions: any;

  public messages: Message[] = [];

  public rollupTypes: SelectItem[];
  public rollupType: HistoricalRollupType;
  public loading: boolean = false;
  constructor(private cygNet: CygNetApiService) {
    //set default to match the rollupdropdown
    this.selectedInterval = HistoryRollupType.Minute;
    this.intervals = [
      { label: "Minute", value: HistoryRollupType.Minute },
      { label: "Hour", value: HistoryRollupType.Hour },
      { label: "Day", value: HistoryRollupType.Day }
    ];

    this.minuteRollupInterval = MinuteIntervals.FifteenMinutes;
    this.minuteIntervals = [
      { label: "15 minutes", value: MinuteIntervals.FifteenMinutes },
      { label: "30 minutes", value: MinuteIntervals.ThirtyMinutes }
    ];

    this.hourRollupInterval = HourIntervals.OneHour;
    this.hourIntervals = [
      { label: "1 hour", value: HourIntervals.OneHour },
      { label: "2 hours", value: HourIntervals.TwoHours },
      { label: "3 hours", value: HourIntervals.ThreeHours },
      { label: "4 hours", value: HourIntervals.FourHours },
      { label: "6 hours", value: HourIntervals.SixHours },
      { label: "8 hours", value: HourIntervals.EightHours },
      { label: "12 hours", value: HourIntervals.TwelveHours }
    ];

    this.rollupType = HistoricalRollupType.CalculatedWeightedAverage;
    this.rollupTypes = [
      { label: "Calculated weighted average", value: HistoricalRollupType.CalculatedWeightedAverage },
      { label: "Calculated mean", value: HistoricalRollupType.CalculatedMean },
      { label: "Calculated min", value: HistoricalRollupType.CalculatedMin },
      { label: "Calculated max", value: HistoricalRollupType.CalculatedMax },
      { label: "Calculated delta", value: HistoricalRollupType.CalculatedDelta },
      { label: "Calculated last", value: HistoricalRollupType.CalculatedLast },
      { label: "Thinned median", value: HistoricalRollupType.ThinnedMedian },
      { label: "Thinned min max", value: HistoricalRollupType.ThinnedMinMax },
      { label: "Thinned last", value: HistoricalRollupType.ThinnedLast }
    ];
      
    this.chartOptions = {
      title: {
        display: true,
        text: "",
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    }

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    }
  }

  ngOnInit() {
  }

  public async getHistory(chart: UIChart): Promise<void> {
    if (!this.cygNet.isLoggedIn()) {
      this.showError("You are not logged in, please log in.");
      return;
    }
    if (!this.cygNet.isDomainSet()) {
      this.showError("You have not specified a domain, please do so.");
      return;
    }
    this.loading = true;
    switch (this.selectedInterval) {
      case HistoryRollupType.Minute: {
        this.minuteRequest = new HistoryRollupMinuteRequest();
        this.minuteRequest.start = this.startDate.toISOString();
        this.minuteRequest.end = this.endDate.toISOString();
        this.minuteRequest.rollupType = this.rollupType;
        this.minuteRequest.minuteRollupInterval = this.minuteRollupInterval;
        this.response = await this.cygNet.getHistoryRollupMinute(this.pointTag, this.minuteRequest);
        break;
      }
      case HistoryRollupType.Hour: {
        this.hourRequest = new HistoryRollupHourRequest();
        this.hourRequest.start = this.startDate.toISOString();
        this.hourRequest.end = this.endDate.toISOString();
        this.hourRequest.rollupType = this.rollupType;
        this.hourRequest.hourRollupInterval = this.hourRollupInterval;
        this.response = await this.cygNet.getHistoryRollupHour(this.pointTag, this.hourRequest);
        break;
      }
      case HistoryRollupType.Day: {
        this.dayRequest = new HistoryRollupDayRequest();
        this.dayRequest.start = this.startDate.toISOString();
        this.dayRequest.end = this.endDate.toISOString();
        this.dayRequest.rollupType = this.rollupType;
        this.dayRequest.dayStartHour = this.dayStartHour;
        this.response = await this.cygNet.getHistoryRollupDay(this.pointTag, this.dayRequest);
        break;
      }
      default: {
        //Should be impossible.
        break;
      }

    }
    this.updateChart(chart);
    this.loading = false;
  }

  private updateChart(chart: UIChart) {
    let labels: Date[] = new Array<Date>();
    let data: string[] = new Array<string>();

    this.response.historyRecords.forEach((entry) => {
      labels.push(entry.timestamp);
      data.push(entry.value);
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: this.pointTag,
          data: data
        }
      ]
    }

    this.chartOptions = {
      title: {
        display: true,
        text: this.pointTag,
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };

    setTimeout(() => chart.reinit(), 100);
  }

  private isDaySelected(): boolean {
    return this.selectedInterval == HistoryRollupType.Day;
  }

  private isHourSelected(): boolean {
    return this.selectedInterval == HistoryRollupType.Hour;
  }

  private isMinuteSelected(): boolean {
    return this.selectedInterval == HistoryRollupType.Minute;
  }

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }
}

export enum HistoryRollupType {
  Minute,
  Hour,
  Day
}
