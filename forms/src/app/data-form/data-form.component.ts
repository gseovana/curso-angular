import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  )
    {}

  ngOnInit(){

    /* this.form = new FormGroup({
        nome: new FormControl(null),
        email: new FormControl(null)

        endereco: new FormGroup({
          cep: new FormControl(null)
        })
      });
    */
   
      this.form = this.formBuilder.group({
        nome: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
          endereco: this.formBuilder.group({
          cep: [null, Validators.required],
          numero: [null, Validators.required],
          complemento: [null],
          rua: [null, Validators.required],
          bairro: [null, Validators.required],
          cidade: [null, Validators.required],
          estado: [null, Validators.required]
        })

      });
      
  }

  onSubmit() {
    console.log(this.form);
    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .pipe(
        map(response => response)
      )
      .subscribe(
        dados => {
          console.log(dados);
          //rese
          //this.form.reset();
          this.cancelar();
        });
  }

  cancelar(){
    this.form.reset();
  }

  verificaValidTouched(campo) {
    return !this.form.get(campo).valid && this.form.get(campo).touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': !campo.valid && campo.touched
    };
  }

}
