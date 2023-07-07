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

    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadById(id)),
      //switchMap(cursos => obterAulas)
    )
    .subscribe(curso => this.updateForm(curso));

    //concatMap -> ordem da requisição importa
    //mergeMap -> ordem não importa
    //exhaustMap -> casos de login

    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });

  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.create(this.form.value).subscribe({
        next: dados => {
          console.log(dados);
        },
        error: error => {
          this.modal.showAlertDanger('Erro ao criar curso. Tente novamente.')
        },
        complete: () => {
          this.modal.showAlertSuccess('Curso criado com sucesso!');
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
