import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { CygNetApiService } from '../core/cygnet-api.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavMenuComponent implements OnInit {

  private menuItems: MenuItem[];
  private domain: number;
  private isDomainSet: boolean;
  private isLoggedIn: boolean;

  constructor(private cygNet: CygNetApiService) { }

  ngOnInit() {
    this.domain = null;
    this.isDomainSet = false;
    this.isLoggedIn = false;
    this.menuItems = [
      { label: 'Home', routerLink: '/', routerLinkActiveOptions: { exact: true } },
      { label: 'Example', routerLink: "example", routerLinkActiveOptions: { exact: true }},
      { label: 'Services', routerLink: "services", routerLinkActiveOptions: { exact: true }},
      { label: 'Facilities', routerLink: "facilities", routerLinkActiveOptions: { exact: true }},
      { label: 'Facilities by Tag Filter', routerLink: "facilities/filter", routerLinkActiveOptions: { exact: true }},
      { label: 'Relative Facilities', routerLink: "facilities/relative", routerLinkActiveOptions: { exact: true }},
      { label: 'History', routerLink: "points/history", routerLinkActiveOptions: { exact: true }},
      { label: 'History Rollup', routerLink: "points/history/rollup", routerLinkActiveOptions: { exact: true } },
      { label: 'Realtime', routerLink: "points/realtime", routerLinkActiveOptions: { exact: true }},
      { label: 'Realtime Lightweight', routerLink: "points/realtimelightweight", routerLinkActiveOptions: { exact: true } },
      { label: 'Point Property', routerLink: "points/pointproperty", routerLinkActiveOptions: { exact: true } },
      { label: 'Groups', routerLink: "groups", routerLinkActiveOptions: { exact: true } }
    ]
  }

  public async login() {
    this.isLoggedIn = await this.cygNet.login();
  }

  public setDomain(domain: number): void {
    if (domain != null && domain > 0) {
      this.cygNet.setDomain(domain);
      this.domain = domain;
      this.isDomainSet = true;
    }
  }

  public menuItemClicked(): void {

  }


}
