import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import * as Parse from 'parse';


@Injectable({
  providedIn: 'root'
})

export class TabledataService {

  x = 0;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  data:any[] = [];
  datare;
  constructor() { 
    Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
    Parse.initialize(
      'x96xrHRh3rIIVxp9lP4nU6N1gUgGlmgrcpD9tJ6d', // This is your Application ID
      'pf1GfLacsYGOBkvUmKpGavNJoNta4IMtOJ3oyTJZ', // This is your Javascript key
      'aKhmRuKTQZpJPS7vY6y7LhaTGVMJimLuQN0l21OF' // This is your Master key (never use it in the frontend)
    );
  }

  //ฟังชั่นส่งข้อมูล dataSource
  sendData(){
    return this.dataSource;
  }

  //ฟังชั่นรับข้อมูล แล้วเอามาใส่ลงใน dataSource
  getData(){
    const My2Class = Parse.Object.extend('My2Class');
    const query = new Parse.Query(My2Class);

    query.descending("createdAt");

    query.find().then((results) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
      
      for (let i of results){
        

        this.data.push({position: i.get("position"), name: i.get("name"), weight: i.get("weight"), symbol: i.get("symbol")}) 
      }
      
      console.log('My2Class found', this.data);
      this.datare = new MatTableDataSource(this.data);

      return this.datare;
      
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while fetching My2Class: ${JSON.stringify(error)}`);
      console.error('Error while fetching My2Class', error);
    });
  }
}


//ลักษณะของข้อมูล
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

//ข้อมูล
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];