export class NoteCreateRequest{
    
    siteService: string;
    body: string;
    type: string;
    summary: string;
    start: string;
    end: string;
    facilityAssociations: string[];
    pointAssociations: string[];
    textAttributes: string[];
    tableAttributes: string[]
    yesNoAttributes:boolean[]

    constructor(){
        this.facilityAssociations = [];
        this.pointAssociations = [];
        this.textAttributes = [];
        this.tableAttributes = [];
        this.yesNoAttributes = [];
        this.siteService = "";
        this.body = "";
        this.type = "";
        this.summary = "";
        this.start = "";
        this.end = "";
    }
}
