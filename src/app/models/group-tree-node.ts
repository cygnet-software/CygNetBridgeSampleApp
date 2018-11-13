import { TreeNode } from "primeng/api";

export class GroupTreeNode implements TreeNode {
  public label?: string;
  public data?: any;
  public icon?: any;
  public expandedIcon?: any;
  public collapsedIcon?: any;
  public children?: TreeNode[];
  public leaf?: boolean;
  public expanded?: boolean;
  public type?: string;
  public parent?: TreeNode;
  public partialSelected?: boolean;
  public styleClass?: string;
  public draggable?: boolean;
  public droppable?: boolean;
  public selectable?: boolean;

  public facility: string;
}
