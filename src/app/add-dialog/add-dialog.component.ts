import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  //formcontrol require----------------------------
  tileFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(public parse:ParseapiService,private _snackBar: MatSnackBar) {
    parse.init();
   }

  //ทำ AutoCompete------------------
  myControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
 //-----------------------

  ngOnInit() {
    this.parse.getAutoCompleteDocOwner();

    //--ทำ AutoCompete-------------------------------
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    //---------------------------------------------

  }
  //--ทำ AutoCompete----------------------------------
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  //----------------------------------------------


 adddata(title,docowner,docdate,comment){
    this.parse.onclickgetdata(title,docowner,docdate,comment);
    
  }

}