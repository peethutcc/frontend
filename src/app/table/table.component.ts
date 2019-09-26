import { Component, OnInit } from '@angular/core';
import { TabledataService } from '../services/tabledata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  
  //data = ELEMENT_DATA;
  constructor(public tb:TabledataService) { }

  ngOnInit() {
  }

  //เรียกเซอร์วิส TabledataService มาแล้วใช้ฟังชั่น sendData() ในเซอรืวิส
  data = this.tb.sendData();
  
 

}

