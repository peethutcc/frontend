import { Component, OnInit, ViewChild } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

//const fs = require("fs")
@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css']
})
export class FileDialogComponent implements OnInit {
  displayedColumns: string[] = ['filename', 'actions'];
 //เรียงข้อมูล
 @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public ps:ParseapiService,private router: Router) {
    ps.init();
    
  }
  datare2;
  mailbox;
  fileData: File = null;
  
  ngOnInit() {

    //รับข้อมูล
    this.getFileDataAll();

    if (this.ps.subsVar2==undefined) {    
      this.ps.subsVar2 = this.ps.    
      invokeSecondComponentFunction.subscribe((name:string) => {    
        this.getFileDataAll();    
      });    
    }
    
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
obid;
  onclicktestdata(row){
    //this.ps.sendid(row);
    this.obid = row;
    console.log(row);
  }
  //เรียกฟังชั่นupload
  callupload(){
    this.ps.upload(this.fileData);
  };


  getFileDataAll(){
    this.mailbox=this.ps.getFileData();
    this.mailbox.then( results => {
      console.log("fromfilecomponent");
      console.log(results);
      this.datare2 = JSON.parse(JSON.stringify(results))
      this.datare2 = new MatTableDataSource(this.datare2);
      this.datare2.sort = this.sort;
    })
  }

  downloadFile(){
    //this.router.navigate(this.obid.file.url);
    window.open(this.obid.file.url);
    //return this.obid.file.url;
  }

  deletedata(){
    this.ps.deleteFile(this.obid.objectId);
  }
}


