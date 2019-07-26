import {Component, OnInit, Input, ViewEncapsulation} from "@angular/core"
import { NoteRecord } from "../models/notes-get-response";
import { SelectItem, Message } from "primeng/api";
import { GetActiveNoteTypesResponse } from "../models/get-active-note-types-response";
import { CygNetApiService } from "../core/cygnet-api.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
    selector:"note-detail",
    templateUrl:"./note-detail.component.html",
    styleUrls: ['./note-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class NoteDetailComponent implements OnInit {
    @Input() set noteFromParent(note: NoteRecord){
        if(note)
        { 
            this.note = note;
            this.noteType = [{label:this.note.type,value:this.note.type}];
            this.selectedType = this.note.type;
            this.noteStartDate = new Date(note.startTimestamp);
            if(note.endTimestamp){
                this.noteEndDate = new Date(note.endTimestamp);
            }
        }
    }
    
    @Input() set edit (edit: boolean){
        if(edit)
        {
            this.noteSummary = this.note.summary;
            this.noteBody   = this.note.body;
        }
        this.editForm = edit
    }  

    @Input() siteService;

    public note : NoteRecord;
    public noteBody: string;
    public noteSummary: string;
    public editForm :boolean;
    public noteStartDate: Date;
    public noteEndDate: Date;
    public noteType: SelectItem[];
    public isLoadingTypes:boolean = false;
    public growlMsgs: Message[] = [];
    public selectedType: string;
    
    ngOnInit(): void {
    }

    constructor (private cygNet:CygNetApiService){
        this.note = new NoteRecord(); 
    }

    public async getNoteTypes(){

        try{
            this.isLoadingTypes = true;
            let updateNoteResponse: GetActiveNoteTypesResponse = await this.cygNet.getActiveNoteTypes(this.siteService);
            if(updateNoteResponse.noteTypes.length >0){
                this.noteType = [];
                for (const type in  updateNoteResponse.noteTypes) {
                    if(updateNoteResponse.noteTypes[type]) {
                        this.noteType.push({label: updateNoteResponse.noteTypes[type], value: updateNoteResponse.noteTypes[type]});
                    }
                    if(this.note.type == updateNoteResponse.noteTypes[type])
                    {
                        this.selectedType = updateNoteResponse.noteTypes[type];
                    }
                }
            }
        }
        catch(e)
        {
            this.showGrowl({severity:'error', summary:'Error getting note types.'});
        }
        this.selectedType =this.note.type ;
        this.isLoadingTypes = false;
    }
    
    private showGrowl(message: Message){
        this.growlMsgs.push(message);
        setTimeout(() => {
            this.growlMsgs =[];
        }, 1000);
    }

}
