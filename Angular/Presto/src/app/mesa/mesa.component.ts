import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MesaService } from './mesaService';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Mesa } from './mesa';
import { Pedido } from '../pedidos/pedido';
import { CardapioService } from '../cardapio/cardapio.service';
import { Produto } from '../produto/produto';
import { faPlus } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  mesas: Mesa[];
  mesaForm: FormGroup;
  mesa: Mesa;
  mesaId: number;

  pedido: Pedido;
  pedidoMesa: Pedido;
  pedidoForm: FormGroup;

  produtosCardapioGeral: Produto[];

  produtosCardapioComida: Produto[];

  produtosCardapioBebida: Produto[];
  produtosPedido: Produto[] = new Array;
  mostrarProdutos: number = 1;

  filtro = 1;

  //Icones
  faPlus = faPlus;

  @ViewChild('fechaModal') fechaModal: ElementRef;

  public date = new Date();

  constructor(private mesaService: MesaService, private fb: FormBuilder, private cardapioService: CardapioService) { }

  ngOnInit(): void {
    this.mesaService.getAllMesas().subscribe(
      mesa => {
        this.mesas = mesa;
      }
    )

    this.cardapioService.produtosCardapio().subscribe(
      cardapioRetorno => {
        this.produtosCardapioGeral = cardapioRetorno;
      }
    )
    this.cardapioService.produtoPorTipo("comida").subscribe(
      produtosLista => {
        this.produtosCardapioComida = produtosLista;
      }
    );
    this.cardapioService.produtoPorTipo("bebida").subscribe(
      produtosLista => {
        this.produtosCardapioBebida = produtosLista;
      }
    )


    this.mesaForm = this.fb.group({
      nome: ['', [Validators.required]]
    })

    this.pedidoForm = this.fb.group({
      descricao: ['', [Validators.required]],
    })

    setInterval(() => {
      this.date = new Date();
    }, 10000);


  }
  loadNovaMesa() {
    this.mesaService.getAllMesas().subscribe(
      mesa => {
        this.mesas = mesa;
      }
    )
  }

  load() {
    sessionStorage.refresh = true;
    (sessionStorage.refresh == 'true' || !sessionStorage.refresh)
      && location.reload();
    sessionStorage.refresh = false;
  }

  criarMesa() {
    this.mesaService.criarMesa(this.mesaForm.value).subscribe(
      mesa1 => {
        this.fechaModal.nativeElement.click();
        this.loadNovaMesa();
      }
    )
  }


  capturaIdMesa(id: number) {

    this.mesaId = id;
  }






  //------------Pedido--------------
  addPedidoNaMesa() {

    this.mesaService.addPedidoMesa(this.mesaId).subscribe(
      pedidoReceive => {
        this.mostrarProdutos = 2
        this.pedido = pedidoReceive
      }

    )
  }


  addProdutoPedido(produto: Produto) {
    this.produtosPedido.push(produto);
  }

  removerProdutoPedido(produto: Produto) {
    var i = 0;
    while (i < this.produtosPedido.length) {
      if (this.produtosPedido[i].id === produto.id) {
        this.produtosPedido.splice(i, 1);
        i = this.produtosPedido.length;
      } else {
        i++;
      }
    }
  }

  registarProdutosPedido() {
    this.mesaService.addProdutosPedido(this.produtosPedido, this.pedido.id).subscribe(
      produtosDoPedio => {
        this.pedido = produtosDoPedio;
        this.mostrarProdutos = 3;
        while (this.produtosPedido.length) {
          this.produtosPedido.pop();
        }

      }
    )
  }
  alterarProdutosPedido() {
    this.mesaService.atualizarProdutosPedido(this.produtosPedido, this.pedido.id).subscribe(
      produtosDoPedio => {
        this.pedido = produtosDoPedio;
        this.mostrarProdutos = 3;
        while (this.produtosPedido.length) {
          this.produtosPedido.pop();
        }

      }
    )
  }

  pedidoDaMesa(id: number) {
    this.mesaService.pedidoDaMesa(id).subscribe(
      pedido => {
        this.pedidoMesa = pedido;
      }
    )
  }

  removePedidoDaMesa(idMesa: number, idPedido: number) {
    this.mesaService.removePedidoMesa(idMesa, idPedido).subscribe(
      pedidoRemovido => {
        this.load();
      },
      error => {
        this.load();
      }

    )
  }

  getTempo(id: number, somaTempo: number) {
    var now = new Date();
    var tempo = new Date();

    var armazenaTempo = now.getMinutes() + somaTempo;
    tempo.setMinutes(armazenaTempo);

    this.mesaService.tempoMesa(id, tempo, now, this.pedidoForm.value).subscribe(
      pedidoConTempoCadastrado => {
        this.pedido = pedidoConTempoCadastrado;
        this.load();
      }
    )

  }

  //------------Cardapio--------------

  exibirfiltroGeral() {
    this.filtro = 1;
  }
  exibirfiltroComida() {
    this.filtro = 2;
  }
  exibirfiltroBebida() {
    this.filtro = 3;
  }

}
