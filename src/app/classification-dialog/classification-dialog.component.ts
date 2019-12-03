import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';

import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-classification-dialog',
  templateUrl: './classification-dialog.component.html',
  styleUrls: ['./classification-dialog.component.css']
})
export class ClassificationDialogComponent implements OnInit {

  constructor(public ps:ParseapiService,private _snackBar: MatSnackBar) {
    ps.init();
   }
   //ทำ AutoCompete------------------
  myControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
 //-----------------------

ob;
  ngOnInit() {
    this.ob =this.ps.getid();

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

  async classificationdata(files,ogManuscript,copy,status){
    this.ps.classificationData(files,ogManuscript,copy,status);
    await this.delay(500);
    this._snackBar.open('จำแนก', 'สำเร็จ', {
      duration: 2000,
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
