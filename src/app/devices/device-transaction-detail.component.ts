import {Component, OnInit, Input, ViewEncapsulation} from "@angular/core"

@Component({
    selector:"transaction-detail",
    templateUrl:"./device-transaction-detail.component.html",
    encapsulation: ViewEncapsulation.None
})

export class TransactionDetailComponent implements OnInit {
    @Input() transaction: any[];
    
    ngOnInit(): void {
    }

    constructor (){
    }

}