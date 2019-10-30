import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';


@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  constructor(public parse:ParseapiService,) { 
    parse.init();
  }

  ngOnInit() {
  }

  searchDataD(createdAt1,createdAt2,docDate1,docDate2,docOwner,title,comment,status){

    this.parse.searchData(createdAt1,createdAt2,docDate1,docDate2,docOwner,title,comment,status)
    this.firstComponentFunction();
  }

  //event mitter 
  firstComponentFunction(){    
    this.parse.onFirstComponentButtonClick();    
  };

}
