import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styles: [
  ]
})
export class CursosFormComponent {
  
  form: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder){}

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
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    //console.log('cancel');
  }

}
