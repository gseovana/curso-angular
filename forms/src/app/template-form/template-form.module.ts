import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErrorComponent } from '../campo-control-error/campo-control-error.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    FormDebugComponent,
    CampoControlErrorComponent
  ]
})
export class TemplateFormModule { }
