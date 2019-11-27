import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';

import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-classification-dialog',
  templateUrl: './classification-dialog.component.html',
  styleUrls: ['./classification-dialog.component.css']
})
export class ClassificationDialogComponent implements OnInit {

  constructor(public ps:ParseapiService) {
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

  classificationdata(files,ogManuscript,copy,status){
    this.ps.classificationData(files,ogManuscript,copy,status);
    
  }



}
