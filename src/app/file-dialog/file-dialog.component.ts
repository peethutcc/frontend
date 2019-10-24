import { Component, OnInit, ViewChild } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';

//const fs = require("fs")
@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css']
})
export class FileDialogComponent implements OnInit {
  displayedColumns: string[] = ['filename', 'download', 'delete'];
 //เรียงข้อมูล
 @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public ps:ParseapiService) {
    ps.init();
    
  }
  datare2;
  mailbox;
  fileData: File = null;
  
  ngOnInit() {

    //รับข้อมูล
    this.mailbox=this.ps.getFileData();
    this.mailbox.then( results => {
      console.log("fromfilecomponent");
      console.log(results);
      this.datare2 = JSON.parse(JSON.stringify(results))
      this.datare2 = new MatTableDataSource(this.datare2);
      this.datare2.sort = this.sort;
    })
    
  }
  fileProgress(fileInput: any) {
   // var fs=require('fs')
    this.fileData = <File>fileInput.target.files[0];
    //let myfile = fs.readFileSync(this.fileData).toString('base64')
    console.log(event);   
    console.log(this.fileData.name);
    //this.ps.up(this.fileData); 
    //console.log(this.fileData.name);
}
//เรียกตามไอดี
  onclicktestdata(row){
    //this.ps.sendid(row);
    console.log(row);
  }
  //เรียกฟังชั่นupload
  callupload(){
    this.ps.upload(this.fileData);
  };
}


