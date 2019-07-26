import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild("twoFactorInput") twoFactorInput: ElementRef;

  private menuItems: MenuItem[];
  private domain: number;
  private isDomainSet: boolean;
  private isLoggedIn: boolean;
  private twoFactorAuth: boolean;

  constructor(private cygNet: CygNetApiService) { }

  ngOnInit() {
    this.domain = null;
    this.isDomainSet = false;
    this.isLoggedIn = false;
    this.menuItems = [
      { label: 'Home', routerLink: '/', routerLinkActiveOptions: { exact: true } },
      { label: 'Two-factor Authentication', routerLink: "two-factor", routerLinkActiveOptions: { exact: true } },
      { label: 'Example', routerLink: "example", routerLinkActiveOptions: { exact: true }},
      { label: 'Alarms', routerLink: "alarms", routerLinkActiveOptions: { exact: true } },
      { label: 'Notes', routerLink: "notes", routerLinkActiveOptions: { exact: true } },
      { label: 'DataGroups', routerLink: "devices/datagroups", routerLinkActiveOptions: { exact: true } },
      { label: 'Send Transactions', routerLink: "devices/sendTransaction", routerLinkActiveOptions: { exact: true } },
      { label: 'Poll Datagroup', routerLink: "devices/pollDataGroup", routerLinkActiveOptions: { exact: true } },
      { label: 'Command', routerLink: "devices/command", routerLinkActiveOptions: { exact: true } },
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
    let responseCode: number;

    if (this.twoFactorAuth) {
      responseCode = await this.cygNet.twoFactorLogin(this.twoFactorInput.nativeElement.value);
    }
    else {
      responseCode = await this.cygNet.login();
    }

    this.isLoggedIn = responseCode == 200;
    this.twoFactorAuth = responseCode == 403;
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
