import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-error',
  templateUrl: './campo-control-error.component.html',
  styleUrls: ['./campo-control-error.component.css']
})
export class CampoControlErrorComponent {

  @Input() mostrarErro: boolean;
  @Input() mensagemErro: string;

}
