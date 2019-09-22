import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabledataService {

  x = 0;
  dataSource = ELEMENT_DATA;

  constructor() { }

  //ฟังชั่นส่งข้อมูล dataSource
  sendData(){
    return this.dataSource;
  }

  //ฟังชั่นรับข้อมูล แล้วเอามาใส่ลงใน dataSource
  getData(v1){
    this.dataSource.push(v1)
    this.x++;
    alert(JSON.stringify(this.dataSource))
    
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
];