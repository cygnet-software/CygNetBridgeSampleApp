import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CygNetApiService } from '../core/cygnet-api.service';
import { HistoryResponse } from '../models/history-response';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'history-pane',
  templateUrl: './history-pane.component.html',
  styleUrls: ['./history-pane.component.scss']
})
export class HistoryPaneComponent implements OnInit, OnChanges {

  @Input() pointTag: string;
  public started: boolean = false;
  public displayChart: boolean = false;

  public startDate: Date;
  public endDate: Date;

  public response: HistoryResponse;
  public chartData: any;
  public chartOptions: any;

  @Output() busy = new EventEmitter<boolean>();

  constructor(private cygNet: CygNetApiService) {
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

  ngOnChanges() {
    if (this.pointTag != null) {
      this.started = true;
    }
  }


  public async getHistory(chart: UIChart): Promise<void> {
    this.busy.emit(true);
    this.response = await this.cygNet.getHistoryValues(this.pointTag, this.startDate, this.endDate);
    this.busy.emit(false);
    this.updateChart(chart);
    this.displayChart = true;
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

}
