import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-headcomponent',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class headcomponent implements OnInit {

constructor(public dialog: MatDialog,private _bottomSheet: MatBottomSheet) {}


    ngOnInit() {
    }

    openDialogAdd(){
      const dialogRef = this.dialog.open(AddDialogComponent);
    }

    openDialogSearch(){
      const dialogRef = this.dialog.open(SearchDialogComponent);
    }
}

