import { Injectable, EventEmitter } from '@angular/core';
import * as Parse from'parse';//อิมพอร์ตparse
import {MatTableDataSource} from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { stringify } from 'querystring';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParseapiService {
  datare2;
  
  constructor(private _snackBar: MatSnackBar,private router: Router) { 
    
  }
  //เรียกให้มันอินิตตามที่เราตั้งไว้
  init(){
    Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
    Parse.initialize(
      '5edaoITqUp7S45cXm8KTny8Nml7KRey9pl89rsmP', // This is your Application ID
      'cJ5ZW7dr3ZaQFfsxrQPq4CKAX4RybkYvf0yho5MX', // This is your Javascript key
      'nVs74U5EW8xEsA3hcUZMtGiO38R3Rb50uksmqJe9', // This is your Master key (never use it in the frontend)
      '9e6d52ef-10ec-4bcf-85d9-306aeec29a80',
    );
  }

  invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription;

  onFirstComponentButtonClick() {    
    this.invokeFirstComponentFunction.emit();    
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
  async onclickgetdata(title,docowner,docdate,comment){
    
    const meta_dataClass = Parse.Object.extend('meta_data');
    const meta_data = new meta_dataClass();

    var MyCustomClass = Parse.Object.extend("meta_data");
    var query = new Parse.Query(MyCustomClass);


    await query.count().then(count => {
      console.log("this is in add data");
      console.log(count);

      query.descending("createdAt");
      query.limit(1);
      query.find().then(results=>{

        if(count == 0 ){
          console.log("this is in count if == 0");
          meta_data.set('no', Number(1));
        }else{
          console.log("this is in else");
          let number = results[0].get("no");
          meta_data.set('no', Number(number+1));
        }

        meta_data.set('titleName', title);
        meta_data.set('docOwner',docowner );
        meta_data.set('docDate',new Date(docdate));
        meta_data.set('ogManuscript',"" );
        meta_data.save('comment',comment).then((response) => {
          this.onFirstComponentButtonClick();
        });

      });

    });
    
    //console.log(JSON.parse(JSON.stringify(teachername)));
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
  lcomment;
  lstatus;
  //ฟั่งชั่นรับค่าค้นหา
  searchData(createdAt1,createdAt2,docDate1,docDate2,docOwner,title,comment,status){
    this.lcreatedAt1 = createdAt1
    this.lcreatedAt2 = createdAt2
    this.ldocDate1 = docDate1
    this.ldocDate2 = docDate2
    this.ldocOwner = docOwner
    this.ltitle = title
    this.lcomment = comment
    this.lstatus = status
    console.log(this.lcreatedAt1)
  }

  //showdata function
  async getData(){
    const My2Class = Parse.Object.extend('meta_data');
    const query = new Parse.Query(My2Class);
    
    //console.log(this.lcreatedAt1+"this is in get data")
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
      query.startsWith("docOwner", this.ldocOwner);
    }
    if (this.ltitle !== undefined && this.ltitle !== ""){
      query.startsWith("titleName", this.ltitle);
    }
    if (this.lcomment !== undefined && this.lcomment !== ""){
      query.startsWith("comment", this.lcomment);
    }
    if (this.lstatus !== undefined && this.lstatus !== ""){
      query.startsWith("status", this.lstatus);
    }else{
      query.descending("createdAt");
      query.limit(20);
    }
    //query.descending("createdAt");
    //query.equalTo("docOwner","Jaa")
    //query.greaterThan("docDate",new Date("2019-10-5"))

    this.data = await query.find().then((results) => {
      console.log(JSON.parse(JSON.stringify(results)));
      //console.log(results);
      return results;

    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while fetching My2Class: ${JSON.stringify(error)}`);
      console.error('Error while fetching My2Class', error);
    });

    return this.data;
  }


  //editdata function
  edit(titleName,docOwner,docDate,ogManuscript,status,comment){
    const TeachernameClass = Parse.Object.extend('meta_data');
    const query = new Parse.Query(TeachernameClass);
    
    query.get(this.Obid.objectId).then((teachername) => {

      teachername.set('titleName', titleName);
      teachername.set('docOwner',docOwner );
      teachername.set('ogManuscript',ogManuscript );
      //teachername.set('amount',Number(v5) );
      teachername.set('docDate',new Date(docDate));
      teachername.set('status',status);
      teachername.save('comment',comment).then((response) => {
        //this.invokeFirstComponentFunction.emit(); 
        console.log('this is in edit then');
        this.onFirstComponentButtonClick()
      });
    });
  }

  //deletedata function
  async deleteFile(obId){
    const metadata = Parse.Object.extend('file');
    const query = new Parse.Query(metadata);

    await query.get(obId).then((object) => {
      object.destroy().then((response) => {
        this.invokeSecondComponentFunction.emit();
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
  async deletefiledata(){
    const My2Class = Parse.Object.extend('file');
    const query = new Parse.Query(My2Class);

    const meta_data = Parse.Object.extend("meta_data");
    const meta_dataquery = new Parse.Query(meta_data);
    const mymeta_data = new meta_data();
    mymeta_data.id = this.Obid.objectId;

    query.equalTo("owner", mymeta_data);

    this.data = await query.find().then((results) => {
      //console.log("this is in deletefile data");
      //console.log(JSON.parse(JSON.stringify(results)));

      let ndata = JSON.parse(JSON.stringify(results));

      //เรียกฟังชั่นลูปลบไฟล์และข้อมูล
      this.filede(ndata,query,meta_dataquery).then(()=>{
        //this.onFirstComponentButtonClick();
      });
      
      
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while fetching My2Class: ${JSON.stringify(error)}`);
      console.error('Error while fetching My2Class', error);
    });
    //this.onFirstComponentButtonClick();

  }
  //ฟังชั่นลบไฟล์และข้อมูล
  async filede(ndata,query,meta_dataquery){
    for (let i of ndata) {
      //console.log(i.objectId)
        //ลูปลบไฟล์
      let object = await query.get(i.objectId)
      object.destroy();
      console.log('Deleted file_data', object)
    }
    let metadata = await meta_dataquery.get(this.Obid.objectId)
      metadata.destroy();
      console.log('Deleted meta_data', metadata)
      this.onFirstComponentButtonClick();
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


  //uploadfile
  async upload(myfile){
    
    const upfile = Parse.Object.extend('file');
    const myNewObject = new upfile();
  
    const meta_data = Parse.Object.extend("meta_data");
    //const meta_dataquery = new Parse.Query(meta_data);
    const mymeta_data = new meta_data();
    mymeta_data.id = this.Obid.objectId;
    console.log(myfile)
    myNewObject.set('file', new Parse.File(myfile.name,  myfile));
    myNewObject.set('owner',mymeta_data );

    await myNewObject.save().then((ob) =>{
      this.invokeSecondComponentFunction.emit(); 
    });
    
  }

  invokeSecondComponentFunction = new EventEmitter();    
  subsVar2: Subscription;

  onSecondComponentButtonClick() {    
    this.invokeSecondComponentFunction.emit();    
  } 


}
