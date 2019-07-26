import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SelectItem, Message } from "primeng/api";
import { NoteCreateRequest } from "../models/note-create-request";
import { CygNetApiService } from "../core/cygnet-api.service";
import { GetActiveNoteTypesResponse } from "../models/get-active-note-types-response";
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
@Component({
    selector:"note-create",
    templateUrl:"./note-create.component.html",
    styleUrls:['./note-create.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class NoteCreateComponent implements OnInit {
    public createNoteRequest: NoteCreateRequest;
    public noteType: SelectItem[];
    public yesNoAttrValues: SelectItem[];
    public yesNoAttribute: boolean = null;
    public growlMsgs: Message[] = [];
    public isLoadingTypes:boolean = false;
    
    ngOnInit(): void {
    }

    constructor(private cygNet: CygNetApiService){
        this.createNoteRequest = new NoteCreateRequest();

        this.noteType=[];

        this.yesNoAttrValues=[ 
            {label:'Select', value:null},
            {label:'Yes', value:true},
            {label:'No', value:false}];
    }

    public addPointTag(tag:string){
        if(tag){
            this.createNoteRequest.pointAssociations.push(tag);
        }
    }
    
    public addFacilityTag(tag: string){
       if(tag){ 
            this.createNoteRequest.facilityAssociations.push(tag); 
        }
    }

    public addTextAttr(attr: string){

        if(attr && this.createNoteRequest.textAttributes.length < 5) {
            this.createNoteRequest.textAttributes.push(attr); 
        }
        else{
            this.showGrowl({severity:'error', summary:'Max text attributes entered'});
        }
    }
    
    public addTableAttr(attr: string){

        if(attr && this.createNoteRequest.tableAttributes .length < 5) {
            this.createNoteRequest.tableAttributes.push(attr); 
        }
        else {
            this.showGrowl({severity:'error', summary:'Max table attributes entered'});
        }
    }

    public addYesNoAttr(attr: boolean){

        if(attr !==null && this.createNoteRequest.yesNoAttributes.length  < 5) {
            this.createNoteRequest.yesNoAttributes.push(attr); 
        }
        else {
            this.showGrowl({severity:'error', summary:'Max yes/no attributes entered'});
        }
    }

    public async getNoteTypes(){
        if(!this.validateLogin())
        {
          return ;
        }

        try{
            this.isLoadingTypes = true;
            let updateNoteResponse: GetActiveNoteTypesResponse = await this.cygNet.getActiveNoteTypes(this.createNoteRequest.siteService);
            if(updateNoteResponse.noteTypes.length >0){
                this.noteType = [];
                for (const type in  updateNoteResponse.noteTypes) {
                    if(updateNoteResponse.noteTypes[type]) {
                        this.noteType.push({label: updateNoteResponse.noteTypes[type], value: updateNoteResponse.noteTypes[type]});
                    }
                }
            }
        }
        catch(e)
        {
            this.showGrowl({severity:'error', summary:'Error getting note types.'});
        }
        
        this.isLoadingTypes = false;
    }

    
    public validate(){
       
        if(this.createNoteRequest.siteService && this.createNoteRequest.summary && 
            this.createNoteRequest.start && this.createNoteRequest.type && this.createNoteRequest.body){
            return true;
        }
        else {
            return false;
        }
    }
    private validateLogin(){
        if (!this.cygNet.isLoggedIn()) {
            this.showGrowl({severity:'error', summary:"You are not logged in, please log in."});
            return false;
        }
        if (!this.cygNet.isDomainSet()) {
            this.showGrowl({severity:'error', summary:"You have not specified a domain, please do so."});
            return false;
        }
        return true;
    }

    private showGrowl(message: Message){
        this.growlMsgs.push(message);
        setTimeout(() => {
            this.growlMsgs =[];
        }, 1000);
    }
}