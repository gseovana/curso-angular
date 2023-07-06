import { Component } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [
  ]
})
export class CursosListaComponent {

  //cursos: Curso[];

  cursos$: Observable<Curso[]>;

  constructor(private service: CursosService){}

  ngOnInit(){
   // this.service.list()
   //   .subscribe(dados => this.cursos = dados);

   this.cursos$ = this.service.list();
  }
}
