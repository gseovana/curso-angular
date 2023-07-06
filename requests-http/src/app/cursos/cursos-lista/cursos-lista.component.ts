import { Component } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [
  ]
})
export class CursosListaComponent {

  cursos: Curso[];

  constructor(private service: CursosService){}

  ngOnInit(){
    this.service.list()
      .subscribe(dados => this.cursos = dados);
  }
}
