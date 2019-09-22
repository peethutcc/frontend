import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule, MatTable} from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { InputformComponent } from './inputform/inputform.component';

//---- import ตอนทำ input component
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from "@angular/forms";

//----
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InputformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    //---- import ตอนทำ input component
    MatExpansionModule,//extension ที่กดแล้วจะลงมา
    MatFormFieldModule,//form ที่ไว้ใส่ข้อมูล
    MatInputModule,//forminput ที่ไว้ใส่ข้อมูล
    MatSelectModule,//SelectModule input แบบเลือก
    FormsModule,
    //----
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
