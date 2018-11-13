import { SelectItem } from "primeng/api";

export class GroupResponse {
  public nodes: GroupNode[];

  constructor() {
    this.nodes = new Array<GroupNode>();
  }
}

export class GroupNode implements SelectItem {

  /// Select Item Variables ///
  label?: string;
  value: any;
  styleClass?: string;
  icon?: string;
  title?: string;
  /// End Select Item Variables ///
 
  public id: number;
  public description: string;
  public category: string;
  public type: string;

}

