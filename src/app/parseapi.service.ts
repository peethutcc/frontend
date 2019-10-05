import { Injectable } from '@angular/core';
import * as Parse from'parse';//อิมพอร์ตparse


@Injectable({
  providedIn: 'root'
})
export class ParseapiService {

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
adddata(){
  const TeachernameClass = Parse.Object.extend('Teachername');
  const teachername = new TeachernameClass();

  teachername.set('name', 'peeth');
  teachername.set('surname', 'sudlor');

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
}


  
}
