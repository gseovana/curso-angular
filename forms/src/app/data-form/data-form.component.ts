import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validations';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  form: FormGroup;
  estados: EstadoBr[];
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit() {

    this.dropdownService.getEstadosBr()
    .subscribe((dados: any) => {this.estados = dados; console.log(dados)});

    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();


    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, [Validators.required, FormValidations.cepValidator]],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()

    });
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

    /*this.formBuilder.array ([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]);
    */
  }

  requiredMinCheckbox(min = 1){
    const validator = (formArray: FormArray) => {
      /*const values = formArray.controls;
      let totalChecked = 0;

      for (let i = 0; i < values.length; i++) {
        if (values[i].value) {
          totalChecked += 1;
        }
      }*/

      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };

    };
    return validator;
  }

  onSubmit() {
    console.log(this.form);

    let valueSubmit = Object.assign({}, this.form.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i] : null)
      .filter(v => v!== null)
    });

    if(this.form.valid){
      this.http
      .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .pipe(
        map(response => response)
      )
      .subscribe(dados => {
        console.log(dados);
        this.cancelar();
      });
    } else {
      this.verificaValidacoesForm(this.form);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();

      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    })
  }

  cancelar() {
    this.form.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.form.get(campo).valid && (this.form.get(campo).touched || this.form.get(campo).dirty);
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo)
    };
  }

  consultaCEP() {
    let cep = this.form.get('endereco.cep').value;

      if(cep != null && cep !== 'vazio'){
        this.cepService.consultaCEP(cep)
        .subscribe(dados => this.popularDadosForm(dados));
      }
    }

  resetaDadosForm() {
    this.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  popularDadosForm(dados) {
    this.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    //this.form.get('nome').setValue('Geovana');
    //this.form.get('endereco.numero').setValue(14);
  }

  setarCargo(){
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.form.get('cargo').setValue(cargo);
  }

  comparar(obj1, obj2){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 && obj2 ;
  }

  setarTecnologias(){
    this.form.get('tecnologias').setValue(['java', 'javascript', 'php']);
  }

 
}
