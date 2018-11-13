import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CygNetApiService } from '../core/cygnet-api.service';
import { Message } from 'primeng/api';
import { HistoryResponse } from '../models/history-response';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {

  public startDate: Date;
  public endDate: Date;
  public pointTag: string;

  public response: HistoryResponse;
  public chartData: any;
  public chartOptions: any;

  public messages: Message[] = [];
  public inProgress: boolean = false;

  constructor(private cygNet: CygNetApiService)
  {
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

    this.inProgress = true;
    this.response = await this.cygNet.getHistoryValues(this.pointTag, this.startDate, this.endDate);
    this.inProgress = false;
    this.updateChart(chart);
  }

  private updateChart(chart: UIChart) {
    let labels: Date[] =  new Array<Date>();
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

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }
}
