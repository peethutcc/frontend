import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    
  ],
  exports : [
    Material.MatToolbarModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
