import { Component, OnInit } from '@angular/core';
import { ParseapiService } from '../parseapi.service';
import * as Parse from'parse';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  id;
  constructor(public ps:ParseapiService,private _snackBar: MatSnackBar) { 
    ps.init();
  }

  ngOnInit() {
    this.id =this.ps.getid();
  }
  async deletedata(){
  this.ps.deletefiledata();
  await this.delay(500);
  this._snackBar.open('ลบข้อมูล', 'สำเร็จ', {
    duration: 2000,
  });

}

firstComponentFunction(){    
  this.ps.onFirstComponentButtonClick();    
};

  /*delete(){
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
    }*/
    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
