import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
import { GroupNode } from '../models/group-response';
import { CygNetApiService } from '../core/cygnet-api.service';
import { SelectItem, Message } from 'primeng/api';
import { GroupTreeNode } from '../models/group-tree-node';

@Component({
  selector: 'app-base-groups',
  templateUrl: './base-groups.component.html',
  styleUrls: ['./base-groups.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseGroupsComponent implements OnInit {

  public lazyGroups: GroupTreeNode[];
  public siteService: string;
  public groupEntered: boolean = false;

  public messages: Message[] = [];

  constructor(private cygNet: CygNetApiService) {
    this.lazyGroups = new Array<GroupTreeNode>();
  }

  ngOnInit() {
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
    let response = await this.cygNet.getGroupRoots(this.siteService);
    this.lazyGroups = this.translateGroupNodeList(response.nodes);
    this.groupEntered = true;
  }

  public async groupNodeExpand(event) {
    if (event.node) {
      let childNodes = await this.cygNet.getGroupChildren(this.siteService, event.node.data);

      let childTreeNodes = this.translateGroupNodeList(childNodes.nodes);
      event.node.children = childTreeNodes;
    }
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

  private showError(message: string) {
    this.messages.push({ severity: 'error', summary: message });
  }
}
