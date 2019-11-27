import { Component, OnInit, ViewChild } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  displayedColumns: string[] = ['username', 'actions'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public ps:ParseapiService) {
    ps.init();
   }

  ngOnInit() {

    this.getFileDataAll();
  }

//เรียกตามไอดี
obid;
  onclicktestdata(row){
    //this.ps.sendid(row);
    this.obid = row;
    console.log(row);
  };


  datare2;
  mailbox;

  getFileDataAll(){
    this.mailbox=this.ps.getUserData();
    this.mailbox.then( results => {
      console.log("fromusercomponent");
      console.log(results);
      this.datare2 = JSON.parse(JSON.stringify(results))
      this.datare2 = new MatTableDataSource(this.datare2);
      this.datare2.sort = this.sort;
    })
  }

  approveUser(){
    this.ps.approveUser(this.obid.user.objectId);
  };
}
