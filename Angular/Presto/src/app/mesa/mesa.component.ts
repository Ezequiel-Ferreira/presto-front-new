import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MesaService } from './mesaService';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Mesa } from './mesa';
import { Pedido } from '../pedidos/pedido';
import { CardapioService } from '../cardapio/cardapio.service';
import { Produto } from '../produto/produto';



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

  produtosCardapio: Produto[];
  produtosPedido: Produto[] = new Array;
  mostrarProdutos: number = 1;


  @ViewChild('fechaModal') fechaModal: ElementRef;
  public minuto = 0;
  public segundo = 0;
  public date = new Date();

  constructor(private mesaService: MesaService, private fb: FormBuilder, private cardapioService: CardapioService ) { }

  ngOnInit(): void {
    this.mesaService.getAllMesas().subscribe(
      mesa => {
        this.mesas = mesa;
      }
    )

    this.cardapioService.produtosCardapio().subscribe(
      cardapioRetorno => {
        this.produtosCardapio = cardapioRetorno;
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
      this.mesaService.getAllMesas().subscribe(
        mesa => {
          this.mesas = mesa;
        }
      )
    },30000);


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
    console.log('sessionStorage', sessionStorage);
    (sessionStorage.refresh == 'true' || !sessionStorage.refresh)
        && location.reload();
    sessionStorage.refresh = false;
  }

  criarMesa() {
    this.mesaService.criarMesa(this.mesaForm.value).subscribe(
      mesa1 => {
        console.log(mesa1)
        this.fechaModal.nativeElement.click();
        this.loadNovaMesa();
      }
    )
  }

  start() {
    setInterval(() => {
      this.segundo += 1;
      if (this.segundo === 60) {
        this.segundo = 0;
        this.minuto += 1;
        if (this.minuto === 230) {
          this.minuto = 0;
        }
      }
    }, 1000);
    }

  capturaIdMesa(id: number) {
    console.log(id);
    this.mesaId =id;
  }

  addPedidoNaMesa() {
    this.mesaService.addPedidoMesa(this.mesaId, this.pedidoForm.value).subscribe(
      pedidoReceive => {
        this.mostrarProdutos = 2
        this.pedido = pedidoReceive
        console.log(pedidoReceive)
      }

    )
  }

  addProdutoPedido(produto: Produto) {
    this.produtosPedido.push(produto);
    console.log(this.produtosPedido);
  }

  registarProdutosPedido() {
    this.mesaService.addProdutosPedido(this.produtosPedido, this.pedido.id).subscribe(
      produtosDoPedio => {
        this.pedido = produtosDoPedio;
        this.mostrarProdutos = 3;
        while(this.produtosPedido.length){
          this.produtosPedido.pop();
        }

      }
    )
  }

  pedidoDaMesa(id : number){
    this.mesaService.pedidoDaMesa(id).subscribe(
      pedido => {
        this.pedidoMesa = pedido;
        console.log(this.pedidoMesa);
      }
    )
  }

  removePedidoDaMesa(idMesa: number, idPedido: number) {
    this.mesaService.removePedidoMesa(idMesa, idPedido).subscribe(
      pedidoRemovido => {
        console.log(pedidoRemovido);
    },
      error => {
        console.log(error)
        this.load();
      }

    )
  }

  getTempo(id: number ,somaTempo: number) {
    var now = new Date();
    var tempo = new Date();

    var armazenaTempo = now.getMinutes() + somaTempo;
    console.log(tempo.getTime());
    tempo.setMinutes(armazenaTempo);
    console.log(tempo.getTime());

    this.mesaService.tempoMesa(id, tempo).subscribe(
      pedidoConTempoCadastrado => {
        this.pedido = pedidoConTempoCadastrado;
        this.load();
      }
    )

  }
}
