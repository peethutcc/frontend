import { Component, OnInit, ViewChild } from '@angular/core';
import { TabledataService } from '../services/tabledata.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ParseapiService } from '../parseapi.service';
import {MatTableDataSource} from '@angular/material/table';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['no','titleName', 'docOwner', 'ogManuscript', 'amount','docDate','status','actions'];
  //เรียงข้อมูล
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  datare:any[] = [];
  datare2;
  mailbox;
  //data = ELEMENT_DATA;
  constructor(public tb:TabledataService,public dialog: MatDialog,public ps:ParseapiService) {
    ps.init();
   }

  ngOnInit() {
    //ไว้เรียงข้อมูล
    //this.data.sort = this.sort;

    //รับข้อมูล
    this.getDataall();
    
  }

  //เรียกเซอร์วิส TabledataService มาแล้วใช้ฟังชั่น sendData() ในเซอรืวิส
  //data = this.tb.sendData();
  

  //ฟิวเตอร์ หาข้อมูล
  applyFilter(filterValue: string) {
    this.datare2.filter = filterValue.trim().toLowerCase();
  }

  //เปิด dialog
  openDialogEdit(){
    const dialogRef = this.dialog.open(EditDialogComponent);
    
  }
  //เปิด dialog
  openDialogDelete(){
    const dialogRef = this.dialog.open(DeleteDialogComponent);
  }

  openDialogFile(){
    const dialogRef = this.dialog.open(FileDialogComponent, {width: '900px',height:'550px'});
  }

  getDataall(){
    this.mailbox=this.ps.getData();
    this.mailbox.then( results => {
      console.log("sssss");
      console.log(results);
      this.datare2 = JSON.parse(JSON.stringify(results))
      this.datare2 = new MatTableDataSource(this.datare2);
      this.datare2.sort = this.sort;
    })
  }

  //data2 = this.tb.getData();

 /* getData(){
    const My2Class = Parse.Object.extend('tt');
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
  }*/
  onclicktestdata(row){
    this.ps.sendid(row);
    console.log(row);
  }
  
}

