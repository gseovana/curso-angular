import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {

  usuario: any = {
    nome: null,
    email: 'geovana@email.com'
  };

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService 
    ) {}

  onSubmit(formulario) {
    console.log(formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
    .pipe(
      map(response => response)
    ).subscribe(dados => {
      console.log(dados);
      formulario.form.reset(); 
    });
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': !campo.valid && campo.touched
    };
  }

  consultaCEP(event: Event, form) {
    let cep = (event.target as HTMLInputElement).value;
    
    cep = cep.replace(/\D/g, '');

    if(cep != null && cep !== 'vazio'){
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.popularDadosForm(dados, form));
    }

  }

  popularDadosForm(dados, formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(formulario){
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
