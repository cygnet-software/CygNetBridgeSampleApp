import { Component, OnInit } from '@angular/core';
import { CygNetApiService } from '../core/cygnet-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private cygNet: CygNetApiService) { }

  public baseUrl: string = "http://localhost";

  ngOnInit() {
  }

  public setBaseUrl(url: any) {
    this.cygNet.setBaseUrl(url.value);
    this.baseUrl = url.value;
  }

}
