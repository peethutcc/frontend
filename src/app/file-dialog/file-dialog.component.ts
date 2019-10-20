import { Component, OnInit, ViewChild } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';

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

}


