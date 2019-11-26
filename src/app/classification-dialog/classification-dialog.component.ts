import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
@Component({
  selector: 'app-classification-dialog',
  templateUrl: './classification-dialog.component.html',
  styleUrls: ['./classification-dialog.component.css']
})
export class ClassificationDialogComponent implements OnInit {

  constructor(public ps:ParseapiService) {
    ps.init();
   }
ob;
  ngOnInit() {
    this.ob =this.ps.getid();
  }
  classificationdata(files,ogManuscript,copy,status){
    this.ps.classificationData(files,ogManuscript,copy,status);
    
  }



}
