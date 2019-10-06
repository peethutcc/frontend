import { Component, OnInit } from '@angular/core';
import { TabledataService } from '../services/tabledata.service';

@Component({
  selector: 'app-inputform',
  templateUrl: './inputform.component.html',
  styleUrls: ['./inputform.component.css']
})
export class InputformComponent implements OnInit {
  value= {};

  constructor(public tb:TabledataService) { }

  ngOnInit() {
  }

  //ฟังชั่นรับข้อมูลจาก input.html 
  onclickgetdata(v1,v2,v3,v4){
    this.value = {'position': v1,'name':v2,'weight':v3,'symbol':v4};

    //this.tb.getData(this.value);//ฟังชั้นของ TabledataService
  }

}
