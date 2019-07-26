import {Component, OnInit, ViewEncapsulation} from "@angular/core"
import { Message, SelectItem } from 'primeng/api';
import { CygNetApiService } from "../core/cygnet-api.service";
import { GetNotesRequest } from "../models/notes-get-request";
import { NoteRecord } from "../models/notes-get-response";
import { NoteUpdateRequest } from "../models/note-update-request";
import { NoteUpdateResponse } from "../models/note-update-response";
import { NoteCreateRequest } from "../models/note-create-request";
import { NoteCreateResponse } from "../models/note-create-response";
import { GetActiveNoteTypesResponse } from "../models/get-active-note-types-response";

@Component({
    selector:"app-base-note",
    templateUrl:"./base-note.component.html",
    styleUrls:["./base-note.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class BaseNoteComponent implements OnInit {
    
    public NOTE_SERVICE_ERROR: string = "Please provide a note site service(NOTE).";

    public errorMessages: Message[] = [];
    public growlMsgs: Message[] = [];
    public pointTags: string[] = [];
    public facilityTags: string[] = [];
    public noteSiteService: string;
    public startDate: string;
    public endDate: string;
    public notes: NoteRecord[];
    public isPopulated: boolean;
    public selectedNote: NoteRecord;
    public showDetail: boolean = false;
    public showCreateNote: boolean = false;
    public edit: boolean = false;
    public editBtnText: string = "Edit";
    public loading: boolean = false;
    public noteType: string;
    public isLoadingTypes: boolean = false;
    public noteTypeList: SelectItem[] = [];

    ngOnInit(): void {
    }

    constructor(private cygNet: CygNetApiService) {
    }

    public addPointTag(tag: string){
        if(tag) {
            this.pointTags.push(tag);
        }
    }
    
    public addFacilityTag(tag: string){
       if(tag) {
           this.facilityTags.push(tag);
        }
    }
    
    public async getNoteTypes(){
        if(!this.validateLogin())
        {
          return ;
        }

        try{
            this.isLoadingTypes = true;
            let updateNoteResponse: GetActiveNoteTypesResponse = await this.cygNet.getActiveNoteTypes(this.noteSiteService);
            if(updateNoteResponse.noteTypes.length >0){
                this.noteTypeList = [];
                for (const type in  updateNoteResponse.noteTypes) {
                    if(updateNoteResponse.noteTypes[type]) {
                        this.noteTypeList.push({label: updateNoteResponse.noteTypes[type], value: updateNoteResponse.noteTypes[type]});
                    }
                }
            }
            this.clearMessages();
        }
        catch(e)
        {
            this.showError('Error getting note types.');
        }
        
        this.isLoadingTypes = false;
    }
    
    public async createNote(noteCreate: any){
        if(!this.validateLogin())
        {
          return ;
        }
        try{
            let createNoteResponse: NoteCreateResponse = await this.cygNet.createNote(noteCreate.createNoteRequest);
            this.showCreateNote = false;
            this.clearMessages();
            this.showGrowl({severity:'success', summary:'Note created successfully!', detail: createNoteResponse.noteTag});
            noteCreate.createNoteRequest = new NoteCreateRequest();
            
        }
        catch(e){
            this.showCreateNote = false;
            this.showGrowl({severity:'error', summary:'Error creating note', detail: e.error.message||e.error});
        }
    }

    public async submitEditedNote(noteDetail: any): Promise<void>{
        if(!this.validateLogin())
        {
          return ;
        }
        this.editNote(false);
        let updateNoteRequest = new NoteUpdateRequest();
        
        updateNoteRequest.note = noteDetail.note;
        updateNoteRequest.note.summary = noteDetail.noteSummary;
        updateNoteRequest.note.body = noteDetail.noteBody;
        updateNoteRequest.note.type = noteDetail.selectedType;
        updateNoteRequest.note.startTimestamp = noteDetail.noteStartDate.toISOString();
        if(noteDetail.noteEndDate){
            updateNoteRequest.note.endTimestamp = noteDetail.noteEndDate.toISOString();
        }

        try{
            let updateNoteResponse: NoteUpdateResponse = await this.cygNet.updateNote(updateNoteRequest,noteDetail.note.noteTag);
            this.showDetail = false;
            this.clearMessages();
            this.showGrowl({severity:'success', summary:'Note updated successfully!'});
        }
        catch(e)
        {
            this.showGrowl({severity:'error', summary:'Error updating note', detail: e.error.message||e.error});
        }

        this.getNotes();
    }

    public openDetails(index: any){
        this.selectedNote = this.notes[index];
        this.showDetail = true;
    }

    public editNote(edit: boolean){
        this.edit = edit;
        this.editBtnText = edit ? 'Cancel' :'Edit';
    }

    public onDetailNoteHide(){
        this.editNote(false);
    }

    public async getNotes(): Promise<void>{
        if(!this.validateLogin())
        {
            return;
        }
        if(!this.validate())
        {
            return ;
        }
        this.loading = true;
        let getNotesRequest = new GetNotesRequest();
        getNotesRequest.siteService = this.noteSiteService;
        getNotesRequest.start = this.startDate;
        getNotesRequest.end = this.endDate;
        if(this.noteType){
            getNotesRequest.type = this.noteType;
        }
        getNotesRequest.facilityAssociations = this.facilityTags;
        getNotesRequest.pointAssociations = this.pointTags;
        getNotesRequest.getBody = true;
        getNotesRequest.getAssociations = true;

        try{
            let getNotesResponse = await this.cygNet.getNotes(getNotesRequest);
            this.notes = getNotesResponse.notes;
            this.isPopulated = true;
            this.clearMessages();
        }
        catch(e)
        {
            this.showGrowl({severity:'error', summary:'Error getting notes', detail: e.error.message||e.error});
        }
        this.loading = false;
    }
      
    private validate(){
        
        if(!this.noteSiteService)
        {
            this.showError(this.NOTE_SERVICE_ERROR);
            return false;
        }
        if(!this.startDate || !this.endDate)
        {
            this.showError("Start and end date are mandatory");
            return false;
        } 

        if(this.pointTags.length == 0 && this.facilityTags.length == 0)
        {
            this.showError("At least one facility tag or point tag must be provided.");
            return false;
        }
        if(this.startDate && this.endDate){
            return this.validateStartEndDate(this.startDate, this.endDate);
        }
        return true;
    }

    private validateStartEndDate(startDate: string, endDate:string): boolean
    {
        let startDatevalue = new Date(startDate).valueOf();
        let endDateValue = new Date(endDate).valueOf();
        if(startDatevalue>endDateValue)
        {
            this.showError("Start date must be less then End date");
            return false;
        }
        
        return true;
    }

    private validateLogin(){
        if (!this.cygNet.isLoggedIn()) {
            this.showError("You are not logged in, please log in.");
            return false;
        }
        if (!this.cygNet.isDomainSet()) {
            this.showError("You have not specified a domain, please do so.");
            return false;
        }
        return true;
    }

    private showError(message: string) {
        this.errorMessages = [];
        this.errorMessages.push({ severity: 'error', summary: message });
    }

    private showGrowl(message: Message){
        this.growlMsgs.push(message);
        setTimeout(() => {
            this.growlMsgs =[];
        }, 3000);
    }
    public clearMessages(){
        this.growlMsgs =[];
        this.errorMessages = [];
    }

}
