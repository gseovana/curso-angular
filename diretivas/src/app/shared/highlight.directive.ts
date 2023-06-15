import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {

  @Input() defaultColor: string = 'white';
  @Input('appHighlight') highlightColor: string = 'yellow'

  @HostListener('mouseenter') onMouseOver(){
   this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor!: string;


  constructor() {}

  ngOnInit(){
    this.backgroundColor = this.defaultColor;
  }
}
