import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import * as Parse from'parse';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  id;
  constructor(public ps:ParseapiService) { 
    ps.init();
 

  }

  ngOnInit() {
    this.id =this.ps.getid();
  }


  delete(){
    const TeachernameClass = Parse.Object.extend('Teachername');
    const query = new Parse.Query(TeachernameClass);
    
    // here you put the objectId that you want to delete
    query.get(this.id.objectId).then((object) => {
      object.destroy().then((response) => {
        console.log('Deleted ParseObject', response);
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while deleting ParseObject: ${JSON.stringify(error)}`);
        console.error('Error while deleting ParseObject', error);
      });
    });
    }


}
