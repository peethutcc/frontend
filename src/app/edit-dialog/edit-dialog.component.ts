import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import * as Parse from'parse';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  id;
  ob1;ob2;ob3;ob4;ob5;
  constructor(public ps:ParseapiService) { 
    ps.init();
 
  }

  ngOnInit() {
    this.id =this.ps.getid();
  }
  
  edit(v1,v2,v3,v4,v5){
  const TeachernameClass = Parse.Object.extend('Teachername');
  const query = new Parse.Query(TeachernameClass);
  

  query.get(this.id.objectId).then((teachername) => {
    teachername.set('name', v1);
    teachername.set('surname',v2 );
    teachername.set('date',v3 );
    teachername.set('originalfile',v4 );
    teachername.save('status',v5);
    teachername.save().then((response) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
     });
  });
  }


  

}
