import { Component, OnInit, ViewChild } from '@angular/core';
import { TabledataService } from '../services/tabledata.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ParseapiService } from '../parseapi.service';
import {MatTableDataSource} from '@angular/material/table';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';
import { MatTable } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['select','no','titleName', 'docOwner', 'ogManuscript','docDate','status','comment','actions'];
  //เรียงข้อมูล
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  datare:any[] = [];
  datare2;
  mailbox;

  //data = ELEMENT_DATA;
  constructor(public tb:TabledataService,public dialog: MatDialog,public ps:ParseapiService  ) {
    ps.init();
   }
   role;
  ngOnInit() {
    this.role = this.ps.role;
    
    //ไว้เรียงข้อมูล
    //this.data.sort = this.sort;

    //รับข้อมูล
    this.getDataall();

    //test evenmitter
    if (this.ps.subsVar==undefined) {    
      this.ps.subsVar = this.ps.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        this.ngOnInit();    
      });    
    }
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
      //console.log("sssss");
      //console.log(results);
      this.datare2 = JSON.parse(JSON.stringify(results))
      this.datare2 = new MatTableDataSource(this.datare2);
      this.datare2.sort = this.sort;

      //this.table.renderRows();
    })
  }

  onclicktestdata(fromtable){
    this.ps.sendid(fromtable);
    console.log(fromtable);
    //this.sendselectedrow();
    //console.log(this.selection._selected);
  }

  // selection----------------------
  //ไว้เลือก selection
  selection = new SelectionModel<any>(true, []);

/** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datare2.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.datare2.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      this.sendselectedrow();
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.sendselectedrow();
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    
  }
  /////------------------------------

  sendselectedrow(){
    this.ps.getselectedrowfromtable(this.selection.selected);
  }

 

  createdAt1='';
  createdAt2='';
  docDate1='';
  docDate2='';
  docOwner='';
  title='';
  comment='';
  status='';
  refresh2() {
   this.ps.searchData(this.createdAt1,this.createdAt2,this.docDate1,this.docDate2,this.docOwner,this.title,this.comment,this.status)
   this.getDataall();

 }
}

