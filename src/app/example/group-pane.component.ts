import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'primeng/api';
import { GroupTreeNode } from '../models/group-tree-node';
import { CygNetApiService } from '../core/cygnet-api.service';
import { GroupNode } from '../models/group-response';
import { GroupDetailResponse } from '../models/group-detail-response';

@Component({
  selector: 'group-pane',
  templateUrl: './group-pane.component.html',
  styleUrls: ['./group-pane.component.scss']
})
export class GroupPaneComponent implements OnInit {

  public lazyGroups: GroupTreeNode[];
  public siteService: string;
  public selectedGroupTreeNode: GroupTreeNode;
  @Output() selectedFacility = new EventEmitter<string>();
  @Output() busy = new EventEmitter<boolean>();
  public groupEntered: boolean = false;

  public messages: Message[] = [];

  constructor(private cygNet: CygNetApiService) {
    this.lazyGroups = new Array<GroupTreeNode>();
  }

  ngOnInit() {
  }

  public async groupNodeExpand(event) {
    if (event.node) {
      this.busy.emit(true);
      let childNodes = await this.cygNet.getGroupChildren(this.siteService, event.node.data);
      this.busy.emit(false);

      let childTreeNodes = this.translateGroupNodeList(childNodes.nodes);
      event.node.children = childTreeNodes;
    }
  }

  public async loadRootGroups(siteService: string): Promise<void> {
    if (!this.cygNet.isLoggedIn()) {
      this.showError("You are not logged in, please log in.");
      return;
    }
    if (!this.cygNet.isDomainSet()) {
      this.showError("You have not specified a domain, please do so.");
      return;
    }

    this.siteService = siteService;
    this.busy.emit(true);
    let response = await this.cygNet.getGroupRoots(this.siteService);
    this.busy.emit(false);
    this.lazyGroups = this.translateGroupNodeList(response.nodes);
    this.groupEntered = true;
  }

  private translateGroupNodeList(groupNodeList: GroupNode[]): GroupTreeNode[] {
    let treeNodeList = new Array<GroupTreeNode>();

    groupNodeList.forEach(function (value) {
      let treeNode = new GroupTreeNode();

      treeNode.data = value.id;
      treeNode.label = value.description;
      treeNode.facility = value.value;
      treeNode.leaf = value.category == "Leaf";

      treeNodeList.push(treeNode);
    });

    return treeNodeList;
  }

  private async groupNodeSelected(event) {
    if (event.node) {
      if (event.node.leaf) {
        this.busy.emit(true);
        let nodeDetails: GroupDetailResponse = await this.cygNet.getGroupNodeDetails(this.siteService, event.node.data);
        this.busy.emit(false);
        this.selectedFacility.emit(this.facilityStringBuilder(nodeDetails.node.referenceSite, nodeDetails.node.referenceService, nodeDetails.node.attributes[0]));
      }
    }
  }

  private facilityStringBuilder(site: string, service: string, facility: string): string {
    return site + "." + service + "::" + facility;
  }

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }
}
