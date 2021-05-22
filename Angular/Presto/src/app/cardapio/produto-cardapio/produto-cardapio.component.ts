import { CardapioService } from './../cardapio.service';
import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../produto/produto';

@Component({
  selector: 'app-produto-cardapio',
  templateUrl: './produto-cardapio.component.html',
  styleUrls: ['./produto-cardapio.component.css']
})
export class ProdutoCardapioComponent implements OnInit {

  @Input() produto: Produto;

  constructor(private cardapioService: CardapioService) { }

  ngOnInit(): void {
  }
  load() {
    sessionStorage.refresh = true;
    (sessionStorage.refresh == 'true' || !sessionStorage.refresh)
      && location.reload();
    sessionStorage.refresh = false;
  }

  removerProdutoDoCardapio(produto: Produto) {
    this.cardapioService.removeProduto(produto).subscribe(
      removeProduto => {
        this.load();
      }
    );
  }
}
