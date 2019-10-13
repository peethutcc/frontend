import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import * as Parse from'parse';
import { ParseapiService } from '../parseapi.service';
@Component({
  selector: 'app-headcomponent',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class headcomponent implements OnInit {

constructor(public dialog: MatDialog,private _bottomSheet: MatBottomSheet,parse:ParseapiService) {
  parse.init();
}


    ngOnInit() {
      this.adddata
    }

    openDialogAdd(){
      let dialogRefAdd = this.dialog.open(AddDialogComponent);

      dialogRefAdd.afterClosed().subscribe(result=> {
        console.log(`Dialog result : ${result}`);
      }
   )
    }

    openDialogSearch(){
      const dialogRef = this.dialog.open(SearchDialogComponent);
    }

    adddata(){
      const TeachernameClass = Parse.Object.extend('Teachername');
      const teachername = new TeachernameClass();
    
      teachername.set('name', 'peeth');
      teachername.set('surname', 'sudlor');
    
      teachername.save().then(
        (result) => {
          if (typeof document !== 'undefined') document.write(`ParseObject created: ${JSON.stringify(result)}`);
          console.log('ParseObject created', result);
        },
        (error) => {
          if (typeof document !== 'undefined') document.write(`Error while creating ParseObject: ${JSON.stringify(error)}`);
          console.error('Error while creating ParseObject: ', error);
        }
      );
    }
}

