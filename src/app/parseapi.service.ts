import { Injectable } from '@angular/core';
import * as Parse from'parse';//อิมพอร์ตparse
import {MatTableDataSource} from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { stringify } from 'querystring';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParseapiService {
  datare2;
  constructor(private _snackBar: MatSnackBar,private router: Router) { }
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
lcreatedAt1;
lcreatedAt2;
ldocDate1;
ldocDate2;
ldocOwner;
ltitle;
lamount;
lstatus;
//ฟั่งชั่นรับค่าค้นหา
searchData(createdAt1,createdAt2,docDate1,docDate2,docOwner,title,amount,status){
  this.lcreatedAt1 = createdAt1
  this.lcreatedAt2 = createdAt2
  this.ldocDate1 = docDate1
  this.ldocDate2 = docDate2
  this.ldocOwner = docOwner
  this.ltitle = title
  this.lamount = amount
  this.lstatus = status
  console.log(this.lcreatedAt1)
}

//showdata function
async getData(){
  const My2Class = Parse.Object.extend('meta_data');
  const query = new Parse.Query(My2Class);
  
  console.log(this.lcreatedAt1+"this is in get data")
  if ((this.lcreatedAt1 !== undefined && this.lcreatedAt1 !== "") && (this.lcreatedAt2 !== undefined && this.lcreatedAt2 !== "")){
    query.greaterThanOrEqualTo("createdAt", new Date(this.lcreatedAt1));
    query.lessThanOrEqualTo("createdAt", new Date(this.lcreatedAt2));
  }
  if ((this.ldocDate1 !== undefined && this.ldocDate1 !== "") && (this.ldocDate2 !== undefined && this.ldocDate2 !== "")){
    query.greaterThanOrEqualTo("docDate", new Date(this.ldocDate1));
    query.lessThanOrEqualTo("docDate", new Date(this.ldocDate2));
  }
  if (this.ldocOwner !== undefined && this.ldocOwner !== ""){
    console.log(this.ldocOwner+"this is in docOwner if")
    query.equalTo("docOwner", this.ldocOwner);
  }
  if (this.ltitle !== undefined && this.ltitle !== ""){
    query.equalTo("titleName", this.ltitle);
  }
  if (this.lamount !== undefined && this.lamount !== ""){
    query.equalTo("amount", Number(this.lamount));
  }
  if (this.lstatus !== undefined && this.lstatus !== ""){
    query.equalTo("status", this.lstatus);
  }else{
    query.descending("createdAt");
    query.limit(20);
  }
  //query.descending("createdAt");
  //query.equalTo("docOwner","Jaa")
  //query.greaterThan("docDate",new Date("2019-10-5"))

  this.data = await query.find().then((results) => {
    console.log(JSON.parse(JSON.stringify(results)));
    console.log(results);
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
  const metadata = Parse.Object.extend('meta_data');
  const query = new Parse.Query(metadata);

  query.get(this.Obid.objectId).then((object) => {
    object.destroy().then((response) => {
      console.log('Deleted ParseObject', response);
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while deleting ParseObject: ${JSON.stringify(error)}`);
      console.error('Error while deleting ParseObject', error);
    });
  });

}

//getfiledata
async getFileData(){
  const My2Class = Parse.Object.extend('file');
  const query = new Parse.Query(My2Class);

  const meta_data = Parse.Object.extend("meta_data");
  const mymeta_data = new meta_data();
  mymeta_data.id = this.Obid.objectId;

  // Just the objectId is enough to compare the object
  query.equalTo("owner", mymeta_data);

  this.data = await query.find().then((results) => {
    console.log(JSON.parse(JSON.stringify(results)));

    return results;

  }, (error) => {
    if (typeof document !== 'undefined') document.write(`Error while fetching My2Class: ${JSON.stringify(error)}`);
    console.error('Error while fetching My2Class', error);
  });

  return this.data;
}

//deletedataandfile
deletefiledata(){
  const My2Class = Parse.Object.extend('file');
  const query = new Parse.Query(My2Class);

  const meta_data = Parse.Object.extend("meta_data");
  const meta_dataquery = new Parse.Query(meta_data);
  const mymeta_data = new meta_data();
  mymeta_data.id = this.Obid.objectId;

  query.equalTo("owner", mymeta_data);

  this.data = query.find().then((results) => {
    console.log(JSON.parse(JSON.stringify(results)));

    let ndata = JSON.parse(JSON.stringify(results));

    //เรียกฟังชั่นลูปลบไฟล์และข้อมูล
    this.filede(ndata,query,meta_dataquery);


  }, (error) => {
    if (typeof document !== 'undefined') document.write(`Error while fetching My2Class: ${JSON.stringify(error)}`);
    console.error('Error while fetching My2Class', error);
  });


}
//ฟังชั่นลบไฟล์และข้อมูล
async filede(ndata,query,meta_dataquery){
  for (let i of ndata) {
    console.log(i.objectId)
      //ลูปลบไฟล์
    let object = await query.get(i.objectId)
    object.destroy();
    console.log('Deleted file_data', object)
  }
  let metadata = await meta_dataquery.get(this.Obid.objectId)
    metadata.destroy();
    console.log('Deleted meta_data', metadata)
}

sendid(id){
  this.Obid=id;
}

getid(){
  return this.Obid;
}

//singup
signUp(u1, u2, u3) {

  var user = new Parse.User();
  user.set('username', u1);
  user.set("password", u2);
  user.set("email", u3);

  user.signUp().then(function(user) {
      console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
      this.router.navigate('/');
  }).catch(function(error){
      console.log("Error: " + error.code + " " + error.message);
  });
  
}

//login
logIn(u1, u2) {
  var user = Parse.User
  .logIn(u1, u2).then(function(user) {
      console.log('User Login successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
      this.router.navigate('/main');
}).catch(function(error){
  console.log("Error: " + error.code + " " + error.message);
});
}
up(){
  const upfile = Parse.Object.extend('file');
  const myNewObject = new upfile();
 
  const meta_data = Parse.Object.extend("meta_data");
  //const meta_dataquery = new Parse.Query(meta_data);
  const mymeta_data = new meta_data();
  mymeta_data.id = this.Obid.objectId;

  myNewObject.set('file', new Parse.File("resume.txt", { base64: btoa("file") }));
  myNewObject.set('owner',mymeta_data );

  myNewObject.save().then(
    (result) => {
      if (typeof document !== 'undefined') document.write(`file created: ${JSON.stringify(result)}`);
      console.log('file created', result);
    },
    (error) => {
      if (typeof document !== 'undefined') document.write(`Error while creating file: ${JSON.stringify(error)}`);
      console.error('Error while creating file: ', error);
    }
  );
}


}
