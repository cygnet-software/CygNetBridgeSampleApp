import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message, TreeNode } from 'primeng/api';
import { CygNetApiService } from '../core/cygnet-api.service';
import { GroupNode } from '../models/group-response';
import { GroupTreeNode } from '../models/group-tree-node';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-example-base',
  templateUrl: './example-base.component.html',
  styleUrls: ['./example-base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExampleBaseComponent implements OnInit {


  public selectedFacility: string;
  public selectedPoint: string;

  public messages: Message[] = [];
  public busy: boolean = false;

  constructor(private cygNet: CygNetApiService)
  {
  }

  ngOnInit() {
  }

  public facilitySelected(facility: string): void {
    this.selectedFacility = facility;
  }

  public pointSelected(pointTag: string): void {
    this.selectedPoint = pointTag;
  } 

  public setBusy(busy: boolean): void {
    this.busy = busy;
  }

}
