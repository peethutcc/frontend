import { Injectable, EventEmitter , NgZone } from '@angular/core';
import * as Parse from'parse';//อิมพอร์ตparse
import {MatTableDataSource} from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { stringify } from 'querystring';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute , ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ParseapiService {
  datare2;
  
  constructor(
    private _snackBar: MatSnackBar,
    private ngZone: NgZone,
    public router: Router
    ) {}
  //เรียกให้มันอินิตตามที่เราตั้งไว้
  init(){
    Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
    Parse.initialize(
      'ok5zCOkoYzbYRIH67sJ94ijRBovEWWYnA3XQj8ob', // This is your Application ID
      '9WzuuI0ms4LBMk21WvgeFuMIXUQn2mBbpISdtyUI', // This is your Javascript key
      'RDgxCPpW7BB6RMEDpXznl6wngCAHM293ROrIjUu9' //master key
  )
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
  async onclickgetdata(title,docowner,docdate,comment,docnumber){
    
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
        meta_data.set('docNumber', docnumber);
        meta_data.set('docOwner',docowner );
        meta_data.set('docDate',new Date(docdate));
        meta_data.set('ogManuscript',"" );
        meta_data.save('comment',comment).then((response) => {
          this.onFirstComponentButtonClick();
          this._snackBar.open('เพิ่มข้อมูล', 'สำเร็จ', {
            duration: 2000,
          });
        });

      });

    });
    
    //console.log(JSON.parse(JSON.stringify(teachername)));
    //this.tb.getData(this.value);//ฟังชั้นของ TabledataService
  }
  //-----------------------------------------------------------

  classificationData(files,ogManuscript,copy,status){
    const TeachernameClass = Parse.Object.extend('meta_data');
    const query = new Parse.Query(TeachernameClass);
    
    query.get(this.Obid.objectId).then((teachername) => {

      teachername.set('files', files);
      teachername.set('ogManuscript', ogManuscript);
      teachername.set('copy',copy );
      teachername.save('status',status ).then((response) => {
        //this.invokeFirstComponentFunction.emit(); 
        console.log('this is in edit then');
        this.onFirstComponentButtonClick()
        this._snackBar.open('แก้ไข', 'สำเร็จ', {
          duration: 2000,
        });
      });
    });


  }



  //-----------------------------------------------------------
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
  ldocNumber;
  lfiles;
  //ฟั่งชั่นรับค่าค้นหา
  searchData(createdAt1,createdAt2,docDate1,docDate2,docOwner,title,comment,status,docNumber,files){
    this.lcreatedAt1 = createdAt1
    this.lcreatedAt2 = createdAt2
    this.ldocDate1 = docDate1
    this.ldocDate2 = docDate2
    this.ldocOwner = docOwner
    this.ltitle = title
    this.lcomment = comment
    this.lstatus = status
    this.ldocNumber = docNumber
    this.lfiles = files
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
    if ((this.lcreatedAt1 !== undefined && this.lcreatedAt1 !== "")){
      query.greaterThanOrEqualTo("createdAt", new Date(this.lcreatedAt1));
      query.lessThanOrEqualTo("createdAt", new Date(this.lcreatedAt1));
    }
    if ((this.ldocDate1 !== undefined && this.ldocDate1 !== "") && (this.ldocDate2 !== undefined && this.ldocDate2 !== "")){
      query.greaterThanOrEqualTo("docDate", new Date(this.ldocDate1));
      query.lessThanOrEqualTo("docDate", new Date(this.ldocDate2));
    }
    if ((this.ldocDate1 !== undefined && this.ldocDate1 !== "")){
      query.greaterThanOrEqualTo("docDate", new Date(this.ldocDate1));
      query.lessThanOrEqualTo("docDate", new Date(this.ldocDate1));
    }
    if (this.ldocOwner !== undefined && this.ldocOwner !== ""){
      console.log(this.ldocOwner+"this is in docOwner if")
      query.startsWith("docOwner", this.ldocOwner.trim().toLowerCase());
    }
    if (this.ltitle !== undefined && this.ltitle !== ""){
      query.startsWith("titleName", this.ltitle.trim().toLowerCase());
    }
    if (this.lcomment !== undefined && this.lcomment !== ""){
      query.startsWith("comment", this.lcomment.trim().toLowerCase());
    }
    if (this.lstatus !== undefined && this.lstatus !== ""){
      query.startsWith("status", this.lstatus);
    }
    if (this.lfiles !== undefined && this.lfiles !== ""){
      query.startsWith("files", this.lfiles.trim().toLowerCase());
    }
    if (this.ldocNumber !== undefined && this.ldocNumber !== ""){
      query.startsWith("docNumber", this.ldocNumber.trim().toLowerCase());
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
  edit(titleName,docOwner,docDate,ogManuscript,status,comment,docNumber){
    const TeachernameClass = Parse.Object.extend('meta_data');
    const query = new Parse.Query(TeachernameClass);
    
    query.get(this.Obid.objectId).then((teachername) => {

      teachername.set('titleName', titleName);
      teachername.set('docNumber', docNumber);
      teachername.set('docOwner',docOwner );
      teachername.set('ogManuscript',ogManuscript );
      //teachername.set('amount',Number(v5) );
      teachername.set('docDate',new Date(docDate));
      teachername.set('status',status);
      teachername.save('comment',comment).then((response) => {
        //this.invokeFirstComponentFunction.emit(); 
        console.log('this is in edit then');
        this.onFirstComponentButtonClick()
        this._snackBar.open('แก้ไข', 'สำเร็จ', {
          duration: 2000,
        });
      });
    });
  }

  //deletedata function
  async deleteFile(obId){
    const metadata = Parse.Object.extend('file');
    const query = new Parse.Query(metadata);

    await query.get(obId).then((object) => {
      object.destroy().then(async (response) => {
        await this.delay(500);
        this.onSecondComponentButtonClick(); 
        this._snackBar.open('ลบไฟล์', 'สำเร็จ', {
          duration: 2000,
        });
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
      this.filede(ndata,query,meta_dataquery).then(async ()=>{
        await this.delay(1000);
        this.onFirstComponentButtonClick();
        this._snackBar.open('ลบข้อมูล', 'สำเร็จ', {
          duration: 2000,
        });
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
  async signUp(u1, u2, u3) {

    var user = new Parse.User();
    user.set('username', u1);
    user.set("password", u2);
    user.set("email", u3);
    user.set("role", "1");
    
    

    await user.signUp().then(function(user) {

      const approve = Parse.Object.extend('approve');
      const myNewObject = new approve();

      myNewObject.set('user', user);
      myNewObject.set('approve', false);
      myNewObject.save();

      alert('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
    }).catch(function(error){
        alert("Error: " + error.code + " " + error.message);
    });
    this.ngZone.run(() => this.router.navigate(['/']));
  }

  //login
  role = '';
  islogin = false;
  isapprove = false;
  async logIn(u1, u2) {
    var user = await Parse.User.logIn(u1, u2).then(async (user)=> {
      this.role = user.get("role");
      this.islogin = true;

      const approve = Parse.Object.extend('approve');
      const approvequery = new Parse.Query(approve);

      approvequery.equalTo("user", user);
      console.log('User found', user);
      var ss = await approvequery.find().then((results) => {
        
        console.log('approve found', results[0].get("approve"));
        this.isapprove = results[0].get("approve")
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while fetching approve: ${JSON.stringify(error)}`);
        console.error('Error while fetching approve', error);
      });
      console.log(this.role);
      this.ngZone.run(() => this.router.navigate(['/main']));
  }).catch(function(error){
    alert("Error: " + error.code + " " + error.message);
  });
  }

  logout(){
    this.islogin = false;
    this.ngZone.run(() => this.router.navigate(['/']));
  }

  /// get user
  async getUserData(){
    const User = new Parse.User();
    const query = new Parse.Query(User);

    const approve = Parse.Object.extend('approve');
    const approvequery = new Parse.Query(approve);

    approvequery.equalTo("approve", false);
    //approvequery.skip(1);
    approvequery.include("user");

    this.data = await approvequery.find().then((results) => {
      console.log(JSON.parse(JSON.stringify(results)));
      //console.log(results[0].get("username"));
      return results;

    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while fetching My2Class: ${JSON.stringify(error)}`);
      console.error('Error while fetching My2Class', error);
    });

    return this.data;
  }

 ///ไว้ยืนยันUser
 userapproveid;
  approveUser(id){
    const User = new Parse.User();
    const query = new Parse.Query(User);

    const approve = Parse.Object.extend('approve');
    const approvequery = new Parse.Query(approve);
    
    
    // Finds the user by its ID
    query.get(id).then((user) => {
      approvequery.equalTo("user", user);
      console.log('User found', user);

      approvequery.find().then((results) => {

        let ndata = JSON.parse(JSON.stringify(results));
        console.log(ndata[0].objectId);
        this.userapproveid = ndata[0].objectId;

        approvequery.get(this.userapproveid).then((object) => {
          object.set('approve', true);
          object.save().then((response) => {

            console.log('Updated approve', response);
          }, (error) => {
            if (typeof document !== 'undefined') document.write(`Error while updating approve: ${JSON.stringify(error)}`);
            console.error('Error while updating approve', error);
          });
        });
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while fetching approve: ${JSON.stringify(error)}`);
        console.error('Error while fetching approve', error);
      });
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while fetching user: ${JSON.stringify(error)}`);
      console.error('Error while fetching user', error);
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

    await myNewObject.save().then(async (ob) =>{
      await this.delay(500);
      this.onSecondComponentButtonClick(); 
      this._snackBar.open('อัพโหลดไฟล์', 'สำเร็จ', {
        duration: 2000,
      });
    });
    
  }

  invokeSecondComponentFunction = new EventEmitter();    
  subsVar2: Subscription;

  onSecondComponentButtonClick() {    
    this.invokeSecondComponentFunction.emit();    
  } 



  getAutoCompleteDocOwner() {

    //var MyCustomClass = Parse.Object.extend("meta_data");
    const query = new Parse.Query("meta_data");

    // // Returns unique emails
    // query.find("docOwner").then(results => {
    //   console.log(`Unique emails: ${JSON.stringify(results)}`);
    // });

    query.distinct("docOwner").then((results) => {
   
    console.log('ParseObjects found:', results);
  }, (error) => {
  
    console.error('Error while fetching ParseObjects', error);
  });


  }


  //--------------export to excel function--------------

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  row;
  getselectedrowfromtable(selectedrow){
    this.row = selectedrow;
  }
  sendselectedrowfromservice(){
    return this.row;
  }
  //--------------------------------------------------------

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
