import { Component } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [
  ]
})
export class CursosListaComponent {

  //cursos: Curso[];

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModalRef?: BsModalRef;

  constructor (
    private service: CursosService,
    private modalService: BsModalService
  ){}

  ngOnInit(){
   /* this.service.list()
     .subscribe(dados => this.cursos = dados);

   this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return EMPTY;
      })
    ) */

    this.onRefresh();
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        //this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );

    //DEPRECATED 
    /* this.service.list().pipe(
      catchError(error => EMPTY)
    )
    .subscribe(
      (dados: any) => {
        console.log(dados);
      },
      error => console.error(error),
      () => console.log('Observable completo!')
    );*/ 

    this.service.list().pipe(
      catchError(error => EMPTY)
    )
    .subscribe({
      next: dados => {
        console.log(dados);
      },
      error: error => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable completo!');
      }
    });
  }

  handleError(){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
