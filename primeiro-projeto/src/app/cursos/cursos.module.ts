import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosService } from './cursos.service';



@NgModule({
  declarations: [
    CursosComponent,
    CursoDetalheComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ //modulos que srão exportados para serem usados em outros modulos
    CursosComponent,
    CursoDetalheComponent
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
