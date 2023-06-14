import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent{
  nomePortal: string;
  cursos: string[];

  //injecao de dependencia do tipo CursosService
  // o modificador de acesso torna cursosService um atributo de CursosComponent
  constructor(private cursosService: CursosService){
    this.nomePortal = 'https://loiane.training';
    this.cursos = this.cursosService.getCursos();
  }

  //var servico = new CursosService();
}

