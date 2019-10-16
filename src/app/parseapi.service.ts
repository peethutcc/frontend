import { Injectable } from '@angular/core';
import * as Parse from'parse';//อิมพอร์ตparse
import {MatTableDataSource} from '@angular/material/table';
import { TableComponent } from './table/table.component';

@Injectable({
  providedIn: 'root'
})
export class ParseapiService {
  datare2;
  constructor() { }
//เรียกให้มันอินิตตามที่เราตั้งไว้
init(){

  Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
  Parse.initialize(
    'x1Byc5Aeg5RRgBHiMvOe9wjylsnYIEiYPFGQ0DnO', // This is your Application ID
    'UJUOaxumcweylTrHStQAb1YUrdLMFfEns7gUJYgd', // This is your Javascript key
    'IXHLeK8teuYmQvEvfQz2Asf8zf6G4qe2Xl4r59CO' // This is your Master key (never use it in the frontend)
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
onclickgetdata(v1,v2,v3,v4,v5){
   
  const TeachernameClass = Parse.Object.extend('tt');
  const teachername = new TeachernameClass();
  
  teachername.set('name', v1);
  teachername.set('surname',v2 );
  teachername.set('date',new Date(v3) );
  teachername.set('originalfile',v4 );
  teachername.save('status',v5);

  console.log(JSON.parse(JSON.stringify(teachername)));
  //this.tb.getData(this.value);//ฟังชั้นของ TabledataService
}
  
//showdata function
getData(){
  const My2Class = Parse.Object.extend('tt');
  const query = new Parse.Query(My2Class);

  query.descending("createdAt");
  
  let data = query.find().then((results) => {
    // You can use the "get" method to get the value of an attribute
    // Ex: response.get("<ATTRIBUTE_NAME>")
    //console.log('My2Class found', results);
    //console.log(JSON.parse(JSON.stringify(results)));
    //console.log('My2Class found', this.datare);
    console.log(JSON.parse(JSON.stringify(results)));
    //this.datare2 = new MatTableDataSource(JSON.parse(JSON.stringify(results)));
    return results;

  }, (error) => {
    if (typeof document !== 'undefined') document.write(`Error while fetching My2Class: ${JSON.stringify(error)}`);
    console.error('Error while fetching My2Class', error);
  });

  return data;
}


//editdata function
edit(v1,v2,v3,v4,v5){
  const TeachernameClass = Parse.Object.extend('tt');
  const query = new Parse.Query(TeachernameClass);
  

  query.get(this.Obid.objectId).then((teachername) => {
    teachername.set('name', v1);
    teachername.set('surname',v2 );
    teachername.set('date',new Date(v3) );
    teachername.set('originalfile',v4 );
    teachername.save('status',v5);
    teachername.save().then((response) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
     });
  });
  
}

//deletedata function
delete(){
  const TeachernameClass = Parse.Object.extend('tt');
  const query = new Parse.Query(TeachernameClass);
  
  // here you put the objectId that you want to delete
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
