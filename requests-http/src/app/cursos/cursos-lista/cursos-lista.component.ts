import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { EMPTY, Observable, Subject, catchError, switchMap, take } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [
  ]
})
export class CursosListaComponent {

  //cursos: Curso[];
  //bsModalRef?: BsModalRef;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal: string | TemplateRef<any> | (new (...args: any[]) => any);

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado: Curso;

  constructor (
    private service: CursosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.onRefresh();
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        return EMPTY;
      })
    );

    // -------------------- DEPRECATED --------------------------
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

    /*this.service.list().pipe(
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
    });*/
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onEdit(id: number){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(curso: Curso){
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
      )
      .subscribe({
        complete: () => {
          this.onRefresh();
        },
        error: ()  => {
          this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente.');
        }
      });
  }

  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id)
    .subscribe({
      complete: () => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error: ()  => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente.');
        this.deleteModalRef.hide();
      }
    });
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }
}
