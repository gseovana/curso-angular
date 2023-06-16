import { Component } from '@angular/core';

@Component({
  selector: 'app-exemplo-pipes',
  templateUrl: './exemplo-pipes.component.html',
  styleUrls: ['./exemplo-pipes.component.css']
})
export class ExemploPipesComponent {

  livro: any = {
    titulo: 'Beyond The Story Uma história dos 10 anos de BTS',
    rating: 4.95874,
    numeroPaginas: 527,
    preco: 159.90,
    dataLancamento: new Date(2023, 6, 9),
    url: 'https://a.co/d/7bsekCL'
  };
}
