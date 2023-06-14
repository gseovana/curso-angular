import { Component } from '@angular/core'

//a parte de template só pode ser usado se tiver até 3 linhas

@Component({
    selector: 'meu-primeiro-component',
    template: `
        <p>Meu primeiro componente com angular 16!</p>
    ` 
})
export class MeuPrimeiroComponent{}