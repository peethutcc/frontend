import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import * as Parse from'parse';
import { deepStrictEqual } from 'assert';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
 
  constructor(public parse:ParseapiService,private _snackBar: MatSnackBar) {
    parse.init();
   }

  ngOnInit() {
  }

  adddata(v1,v2,v3,v4,v5,v6){
    this.parse.onclickgetdata(v1,v2,v3,v4,v5,v6);
    this._snackBar.open('Success', 'Refesh', {
      duration: 2000,
    });
  }

  /* onclickgetdata(v1,v2,v3,v4,v5){
   
    const TeachernameClass = Parse.Object.extend('tt');
    const teachername = new TeachernameClass();
    
    teachername.set('name', v1);
    teachername.set('surname',v2 );
    teachername.set('date',new Date(v3) );
    teachername.set('originalfile',v4 );
    teachername.save('status',v5);
  
    console.log(JSON.parse(JSON.stringify(teachername)));
    //this.tb.getData(this.value);//ฟังชั้นของ TabledataService
  }*/
}