import { BrowserModule } from '@angular/platform-browser';
import { NgModule,} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule, MatTable} from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { InputformComponent } from './inputform/inputform.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
//---- อิมพอร์ท ป๊อปอัพ
import {MatDialogModule} from '@angular/material/dialog';

//---- import ตอนทำ input component
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from "@angular/forms";
import { headcomponent } from './head/head.component';
import { AddComponent } from './add/add.component';
import { DialogOverviewExampleDialog } from './add/add.component';
import { TestserviceComponent } from './testservice/testservice.component';
//----
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSortModule} from '@angular/material/sort';
//--- pop up dialog ---//
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
//---
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatNativeDateModule } from "@angular/material";
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';


import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { RegisterComponent } from './register/register.component';
import { FileDialogComponent } from './file-dialog/file-dialog.component';
import { UploadComponent } from './upload/upload.component';
	
import { HttpClientModule } from '@angular/common/http';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ProgressBarModule} from "angular-progress-bar";
import { UserDialogComponent } from './user-dialog/user-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InputformComponent,
    headcomponent,
    AddComponent,
    TestserviceComponent,
    DialogOverviewExampleDialog,
    AddDialogComponent,
    SearchDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    FileDialogComponent,
    UploadComponent,
    UserDialogComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    //---- import ตอนทำ input component
    MatExpansionModule,//extension ที่กดแล้วจะลงมา
    MatFormFieldModule,//form ที่ไว้ใส่ข้อมูล
    MatInputModule,//forminput ที่ไว้ใส่ข้อมูล
    MatSelectModule,//SelectModule input แบบเลือก
    FormsModule,
    //----
    MatCardModule,
    MatGridListModule,
    MatSortModule,
    MatDatepickerModule,
    MatBottomSheetModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatAutocompleteModule,
    ProgressBarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddDialogComponent,SearchDialogComponent,EditDialogComponent,DeleteDialogComponent,FileDialogComponent,UserDialogComponent],
})
export class AppModule { }
