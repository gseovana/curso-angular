import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../curso';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styles: [
  ]
})
export class CursosFormComponent {

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.service.loadById(id)),
    //   //switchMap(cursos => obterAulas)
    // )
    // .subscribe(curso => this.updateForm(curso));

    //concatMap -> ordem da requisição importa
    //mergeMap -> ordem não importa
    //exhaustMap -> casos de login


    const curso = this.route.snapshot.data['curso'];

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });

  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.valid) {
      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso. Tente novamente!';

      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso. Tente novamente!';
      }

      this.service.save(this.form.value)
        .subscribe({
          next: dados => {
            console.log(dados);
          },
          error: error => {
            this.modal.showAlertDanger(msgError)
          },
          complete: () => {
            this.modal.showAlertSuccess(msgSuccess);
            this.router.navigateByUrl('/cursos');
          }
        });

    }
  }

    onCancel() {
      this.submitted = false;
      this.form.reset();
      //console.log('cancel');
    }

  }

