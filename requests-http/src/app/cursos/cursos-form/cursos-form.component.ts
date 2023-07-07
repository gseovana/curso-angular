import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';

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
    private router: Router
    ){}

  ngOnInit(){

    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  
  }

  hasError(field: string){
    return this.form.get(field)?.errors;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid){
      console.log('submit');
      this.service.create (this.form.value).subscribe({
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

  onCancel(){
    this.submitted = false;
    this.form.reset();
    //console.log('cancel');
  }

}
