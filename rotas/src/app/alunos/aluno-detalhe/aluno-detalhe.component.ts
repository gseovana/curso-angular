import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent {
  aluno: any;
  inscricao: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService
  ){}

  ngOnInit(){
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this.alunosService.getAluno(id);
      }
    );
  }

  ngOnDestroy(){
    this.inscricao?.unsubscribe();
  }
}
