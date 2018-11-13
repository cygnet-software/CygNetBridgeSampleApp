export class GroupNode {
  
  //public CygNet.Core.Indexer<string> Attributes { get; }
  public attributes: string[];
  //public CygNet.Core.Indexer < string > Applications { get; }
  public applications: string[];
  //public CygNet.Core.Indexer < bool > YesNoFields { get; }
  public yesNoFields: boolean[];
  //public string CreatedUserId { get; set; }
  public createdUserId: string;
  //public DateTime CreatedTimestamp { get; set; }
  public createdTimestamp: Date;
  //public DateTime UpdatedTimestamp { get; set; }
  public updatedTimestamp: Date;
  //public string SecurityEvent { get; set; }
  public securityEvent: string;
  //public bool IsVisible { get; set; }
  public isVisible: boolean;
  //public bool AutoMaintain { get; set; }
  public autoMaintain: boolean;
  //public bool HasAuxiliaryData { get; set; }
  public hasAuxiliaryData: boolean;
  //public int AuxiliaryDataLength { get; set; }
  public auxiliaryDataLength: number;
  //public string UpdatedUserId { get; set; }
  public updatedUserId: string;
  //public string SecurityApplication { get; set; }
  public securityApplication: string;
  //public string ReferenceId { get; set; }
  public referenceId: string;
  //public ushort AuxiliaryDataCRC { get; set; }
  public auxiliaryDataCRC: string;
  //public string ReferenceService { get; set; }
  public referenceService: string;
  //public string ReferenceSite { get; set; }
  public referenceSite: string;
  //public string Description { get; set; }
  public description: string;
  //public ReferenceType ReferenceType { get; set; }
  public referenceType: string;
  //public NodeType Type { get; set; }
  public nodeType: string;
  //public NodeCategory Category { get; set; }
  public nodeCategory: string;
  //public NodeId Id { get; set; }
  public id: number;
  //public NodeId HierarchyRoot { get; set; }
  public hierarchyRoot: number;
  //public DateTime AuxiliaryDataTimestamp { get; set; }
  public auxiliaryDataTimestamp: Date;
}
