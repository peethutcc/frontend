import { Component, OnInit, ViewChild } from '@angular/core';
import { TabledataService } from '../services/tabledata.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {MatSort} from '@angular/material/sort';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];
  //เรียงข้อมูล
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  //data = ELEMENT_DATA;
  constructor(public tb:TabledataService,public dialog: MatDialog) {
    
   }

  ngOnInit() {
    //ไว้เรียงข้อมูล
    this.data.sort = this.sort;
  }

  //เรียกเซอร์วิส TabledataService มาแล้วใช้ฟังชั่น sendData() ในเซอรืวิส
  data = this.tb.sendData();
  

  //ฟิวเตอร์ หาข้อมูล
  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

  //เปิด dialog
  openDialogEdit(){
    const dialogRef = this.dialog.open(EditDialogComponent);
  }

  openDialogDelete(){
    const dialogRef = this.dialog.open(DeleteDialogComponent);
  }
}

