import { FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from './../usuario/usuario';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto/produto';
import { Cardapio } from './cardapio';
import { CardapioService } from './cardapio.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  produtos: Produto[];
  cardapio: Cardapio;
  nome: String;
  constructor(private cardapioService: CardapioService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cardapioService.produtosCardapio().subscribe(
      produtos => {
        this.produtos = produtos;
      }
    );

  }


  exibirfiltroGeral(){
    this.cardapioService.produtosCardapio().subscribe(
      produtos => {
        this.produtos = produtos;
      }
    );
  }
  exibirfiltroComida(){
    this.cardapioService.produtoPorTipo("comida").subscribe(
      produtosLista => {
        this.produtos = produtosLista;
      }
    );
  }
  exibirfiltroBebida(){
    this.cardapioService.produtoPorTipo("bebida").subscribe(
      produtosLista => {
        this.produtos = produtosLista;
      }
    );
  }
  buscar(){
    if(this.nome === null || this.nome === ''){
      this.cardapioService.produtosCardapio().subscribe(
        produtos => {
          this.produtos = produtos;
        }
      );
    }else if(this.nome !== null && this.nome !== ''){
    this.cardapioService.produtosPorNomeCardapio(this.nome).subscribe(
      response =>{
        this.produtos = response;
      }
    );
  }
  }
}
