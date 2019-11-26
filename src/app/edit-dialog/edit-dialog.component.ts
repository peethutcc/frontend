import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import * as Parse from'parse';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  ob;
  constructor(public ps:ParseapiService,private _snackBar: MatSnackBar) { 
    ps.init();
 
  }

  ngOnInit() {
    this.ob =this.ps.getid();
  }
  
  editdata(titleName,docOwner,docDate,ogManuscript,status,comment,docNumber){
    this.ps.edit(titleName,docOwner,docDate,ogManuscript,status,comment,docNumber);

    console.log("this is in edit dialog")
    this.firstComponentFunction();
  }

  firstComponentFunction(){    
    this.ps.onFirstComponentButtonClick();    
  };

  /*edit(v1,v2,v3,v4,v5){
  const TeachernameClass = Parse.Object.extend('tt');
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
  }*/


  

}
