import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  //formcontrol require----------------------------
  titleFormControl = new FormControl('', [
    Validators.required
  ]);

  dateFormControl = new FormControl('', [
    Validators.required
  ]);
  constructor(public parse:ParseapiService,private _snackBar: MatSnackBar) {
    parse.init();
  
   }



  ngOnInit() {
  
  }
  

 async adddata(title,docowner,docdate,comment,docnumber){
    this.parse.onclickgetdata(title,docowner,docdate,comment,docnumber);
    await this.delay(500);
    this._snackBar.open('เพิ่มข้อมูล', 'สำเร็จ', {
      duration: 1000,
    });
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}