import { Component, OnInit, ViewChild } from '@angular/core';
import { TabledataService } from '../services/tabledata.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as Parse from 'parse';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ParseapiService } from '../parseapi.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];
  //เรียงข้อมูล
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  datare:any[] = [];
  datare2;
  //data = ELEMENT_DATA;
  constructor(public tb:TabledataService,public dialog: MatDialog,public ps:ParseapiService) {
    tb.init();
  
    //tb.getData();
   }

  ngOnInit() {
    //ไว้เรียงข้อมูล
    this.getData()
    this.data.sort = this.sort;
  }

  //เรียกเซอร์วิส TabledataService มาแล้วใช้ฟังชั่น sendData() ในเซอรืวิส
  data = this.tb.sendData();
  

  //ฟิวเตอร์ หาข้อมูล
  applyFilter(filterValue: string) {
    this.datare2.filter = filterValue.trim().toLowerCase();
  }

  //เปิด dialog
  openDialogEdit(){
    const dialogRef = this.dialog.open(EditDialogComponent);
    
  }

  openDialogDelete(){
    const dialogRef = this.dialog.open(DeleteDialogComponent);
  }
  //data2 = this.tb.getData();

  getData(){
    const My2Class = Parse.Object.extend('Teachername');
    const query = new Parse.Query(My2Class);

    query.descending("createdAt");
    
    query.find().then((results) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
      //console.log('My2Class found', results);
      //console.log(JSON.parse(JSON.stringify(results)));
      //console.log('My2Class found', this.datare);
      console.log(JSON.parse(JSON.stringify(results)));
      this.datare2 = new MatTableDataSource(JSON.parse(JSON.stringify(results)));
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while fetching My2Class: ${JSON.stringify(error)}`);
      console.error('Error while fetching My2Class', error);
    });
  }
  onclicktestdata(row){
    this.ps.sendid(row);
    console.log(row);
  };
}

