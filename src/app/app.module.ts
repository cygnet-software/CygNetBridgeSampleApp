import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule, Calendar } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { GrowlModule } from 'primeng/growl';
import {InputSwitchModule} from 'primeng/inputswitch';

import { AppComponent } from './app.component';
import { CygNetApiService } from './core/cygnet-api.service';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BaseServiceComponent } from './services/base-service.component';
import { BaseFacilitiesComponent } from './facilities/base-facilities.component';
import { BaseGroupsComponent } from './groups/base-groups.component';
import { FacilitiesFilterTagComponent } from './facilities/facilities-filter-tag.component';
import { HistoryComponent } from './points/history.component';
import { RealtimeComponent } from './points/realtime.component';
import { ExampleBaseComponent } from './example/example-base.component';
import { GroupPaneComponent } from './example/group-pane.component';
import { PointPaneComponent } from './example/point-pane.component';
import { HistoryPaneComponent } from './example/history-pane.component';
import { PointPropertyComponent } from './points/point-property.component';
import { RealtimeLightweightComponent } from './points/realtime-lightweight.component';
import { RelativeFacilityComponent } from './facilities/relative-facility.component';
import { HistoryRollupComponent } from './points/history-rollup.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { BaseAlarmsComponent } from './alarms/base-alarms.component';
import { BaseNoteComponent } from './notes/base-note.component';
import { NoteDetailComponent } from './notes/note-detail.component';
import { NoteCreateComponent } from './notes/note-create.component';

import { from } from 'rxjs';
import { DevicesDataGroupComponent } from './devices/devices-datagroup.component';
import { DevicesSendTransactionComponent } from './devices/devices-send-transaction.component';
import { DevicesPollDataGroupComponent } from './devices/devices-poll-datagroup.component';
import { TransactionDetailComponent } from './devices/device-transaction-detail.component';
import { DevicesCommandComponent } from './devices/devices-Command.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    BaseServiceComponent,
    BaseFacilitiesComponent,
    BaseGroupsComponent,
    FacilitiesFilterTagComponent,
    HistoryComponent,
    RealtimeComponent,
    ExampleBaseComponent,
    GroupPaneComponent,
    PointPaneComponent,
    HistoryPaneComponent,
    PointPropertyComponent,
    RealtimeLightweightComponent,
    RelativeFacilityComponent,
    HistoryRollupComponent,
    TwoFactorComponent,
    BaseAlarmsComponent,
    BaseNoteComponent,
    NoteDetailComponent,
    NoteCreateComponent,
    DevicesDataGroupComponent,
    DevicesSendTransactionComponent,
    DevicesPollDataGroupComponent,
    TransactionDetailComponent,
    DevicesCommandComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TabMenuModule,
    ProgressBarModule,
    SidebarModule,
    ButtonModule,
    DropdownModule,
    MenuModule,
    CardModule,
    InputTextModule,
    CheckboxModule,
    TableModule,
    CalendarModule,
    ChartModule,
    MessagesModule,
    MessageModule,
    TreeModule,
    AccordionModule,
    ToolbarModule,
    ProgressSpinnerModule,
    DialogModule,
    InputTextareaModule,
    TabViewModule,
    ScrollPanelModule,
    GrowlModule,
    InputSwitchModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'services', component: BaseServiceComponent, pathMatch: 'full' },
      { path: 'facilities', component: BaseFacilitiesComponent, pathMatch: 'full' },
      { path: 'groups', component: BaseGroupsComponent, pathMatch: 'full' },
      { path: 'facilities/filter', component: FacilitiesFilterTagComponent, pathMatch: 'full' },
      { path: 'points/history', component: HistoryComponent, pathMatch: 'full' },
      { path: 'points/realtime', component: RealtimeComponent, pathMatch: 'full' },
      { path: 'points/pointproperty', component: PointPropertyComponent, pathMatch: 'full' },
      { path: 'points/realtimelightweight', component: RealtimeLightweightComponent, pathMatch: 'full' },
      { path: 'example', component: ExampleBaseComponent, pathMatch: 'full' },
      { path: 'facilities/relative', component: RelativeFacilityComponent, pathMatch: 'full' },
      { path: 'points/history/rollup', component: HistoryRollupComponent, pathMatch: 'full' },
      { path: 'two-factor', component: TwoFactorComponent, pathMatch: 'full' },
      { path: 'alarms', component: BaseAlarmsComponent , pathMatch: 'full' },
      { path: 'notes', component: BaseNoteComponent , pathMatch: 'full' },
      { path: 'devices/datagroups', component: DevicesDataGroupComponent , pathMatch: 'full' },
      { path: 'devices/sendTransaction', component: DevicesSendTransactionComponent , pathMatch: 'full' },
      { path: 'devices/pollDataGroup', component: DevicesPollDataGroupComponent , pathMatch: 'full' },
      { path: 'devices/command', component: DevicesCommandComponent , pathMatch: 'full' }
    ])
  ],
  providers: [CygNetApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
