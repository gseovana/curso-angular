import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver(){
    /*this.elementRef.nativeElement.style.backgroundColor = 'yellow';
    
    a linha acima não é recomendada por tornar o 
    sistema vulneravel possibilitando ataques por xxs

    a linha abaixo seria o ideal
    
    this.renderer.setStyle(this.elementeRef, 'background-color', 'yellow');
    
    */
   this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave(){
    /*this.elementRef.nativeElement.style.backgroundColor = 'white';

    a linha acima não é recmendada por tornar o sistema vulneravel possibilitando ataques por xxs
    
    a linha abixo seria o ideal

    this.renderer.setStyle(this.elementeRef, 'background-color', 'yellow');

    */

    this.backgroundColor = 'white';

  }

  //@HostBinding('style.backgroundColor') backgroundColor!: string;
  
  //usar esse caso precise de alguma manipulação. senão, usar o da linha de cima
  @HostBinding('style.backgroundColor') get setColor(){
    //codigo extra
    return this.backgroundColor;
  }

  private backgroundColor: string | undefined;

  constructor(
    //private elementRef: ElementRef, 
    //private renderer: Renderer2
  ) { 

  }

}
