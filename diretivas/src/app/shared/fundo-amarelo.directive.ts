import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p[appFundoAmarelo]' //para a diretiva ser aplicada a um determinado tipo de tag ou componente, basta colocar o nome da teg imediatamente antes do colchete
})
export class FundoAmareloDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2){
    //this.elementRef.nativeElement.style.backgroundColor = 'yellow';
    //a linha acima não é recmendada por tornar o sistema vulneravel possibilitando ataques por xxs

    this.renderer.setStyle(this.elementRef, 'background-color', 'yellow');
  }
}
