import { Injectable } from '@angular/core';
import * as Parse from'parse';//อิมพอร์ตparse
import {MatTableDataSource} from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { stringify } from 'querystring';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ParseapiService {
  datare2;
  constructor(private _snackBar: MatSnackBar) { }
//เรียกให้มันอินิตตามที่เราตั้งไว้
init(){
  Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
  Parse.initialize(
    '5edaoITqUp7S45cXm8KTny8Nml7KRey9pl89rsmP', // This is your Application ID
    'cJ5ZW7dr3ZaQFfsxrQPq4CKAX4RybkYvf0yho5MX', // This is your Javascript key
    'nVs74U5EW8xEsA3hcUZMtGiO38R3Rb50uksmqJe9' // This is your Master key (never use it in the frontend)
  );
}

//เพิ่มข้อมูล
/*adddata(){
  const TeachernameClass = Parse.Object.extend('Teachername');
  const teachername = new TeachernameClass();

  teachername.set('name', );
  teachername.set('surname', );

  teachername.save().then(
    (result) => {
      if (typeof document !== 'undefined') document.write(`ParseObject created: ${JSON.stringify(result)}`);
      console.log('ParseObject created', result);
    },
    (error) => {
      if (typeof document !== 'undefined') document.write(`Error while creating ParseObject: ${JSON.stringify(error)}`);
      console.error('Error while creating ParseObject: ', error);
    }
  );
}*/
Obid; 


//aaddata function
onclickgetdata(v1,v2,v3,v4,v5,v6){
   
  const TeachernameClass = Parse.Object.extend('meta_data');
  const teachername = new TeachernameClass();

  var MyCustomClass = Parse.Object.extend("meta_data");
  var query = new Parse.Query(MyCustomClass);
  query.count().then(count => {
    console.log(`ParseObjects found: ${count}`);


    teachername.set('no', Number(count+1));

    teachername.set('titleName', v1);
    teachername.set('docOwner',v2 );
    teachername.set('ogManuscript',v4 );
    teachername.set('amount',Number(v5) );
    teachername.set('docDate',new Date(v3));
    teachername.save('status',v6).then((response) => {
      
     });
    
  });
  
  

  console.log(JSON.parse(JSON.stringify(teachername)));
  //this.tb.getData(this.value);//ฟังชั้นของ TabledataService
}
data;

query(){

}
//showdata function
getData(){
  const My2Class = Parse.Object.extend('meta_data');
  const query = new Parse.Query(My2Class);

  //query.descending("createdAt");
  //query.equalTo("docDate","")
  //query.greaterThan("docDate",new Date("2019-10-5"))

  this.data = query.find().then((results) => {
    console.log(JSON.parse(JSON.stringify(results)));
    return results;

  }, (error) => {
    if (typeof document !== 'undefined') document.write(`Error while fetching My2Class: ${JSON.stringify(error)}`);
    console.error('Error while fetching My2Class', error);
  });

  return this.data;
}


//editdata function
edit(v1,v2,v3,v4,v5,v6){
  const TeachernameClass = Parse.Object.extend('meta_data');
  const query = new Parse.Query(TeachernameClass);
  
  query.get(this.Obid.objectId).then((teachername) => {

    teachername.set('titleName', v1);
    teachername.set('docOwner',v2 );
    teachername.set('ogManuscript',v4 );
    teachername.set('amount',Number(v5) );
    teachername.set('docDate',new Date(v3));
    teachername.set('status',v6);
    teachername.save().then((response) => {
     });
  });
}

//deletedata function
delete(){
  const TeachernameClass = Parse.Object.extend('meta_data');
  const query = new Parse.Query(TeachernameClass);

  query.get(this.Obid.objectId).then((object) => {
    object.destroy().then((response) => {
      console.log('Deleted ParseObject', response);
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while deleting ParseObject: ${JSON.stringify(error)}`);
      console.error('Error while deleting ParseObject', error);
    });
  });

  }
  sendid(id){
this.Obid=id;
}

getid(){
  return this.Obid;
}


}
