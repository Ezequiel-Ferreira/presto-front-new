import { BaseApi } from './../base-apis';
import { Pedido } from './../pedidos/pedido';
import { AuthService } from './../authService/authservice.service';
import { Mesa } from './mesa';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produto } from '../produto/produto';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MesaService extends BaseApi {
  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }
  // Chamadas para mesa
  getAllMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(
      this.URL_BASE + '/mesa/mesarestaurante/' +
      this.authService.loggedUser().idRestaurante
    ).pipe
    (tap(console.log));
  }

  criarMesa(mesa: Mesa): Observable<any> {
    return this.http.post<any>(
      this.URL_BASE + '/mesa/create/' + this.authService.loggedUser().idRestaurante,
      mesa
    );
  }
  addPedidoMesa(id: number): Observable<Pedido> {
    return this.http.put<Pedido>(
      this.URL_BASE + '/mesa/createpedido/' + id,
      true
    );
  }

  // Chamadas para pedidos
  criarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(
      this.URL_BASE + '/pedido/create',
      pedido
    );
  }

  addProdutosPedido(produtos: Produto[], id: number): Observable<any> {
    return this.http.put<any>(
      this.URL_BASE + '/pedido/addprodutos/' + id,
      produtos
    );
  }

  atualizarProdutosPedido(produtos: Produto[], id: number): Observable<any> {
    return this.http.put<any>(
      this.URL_BASE + '/pedido/updateitensdopedido/' + id,
      produtos
    );
  }

  pedidoDaMesa(id: number): Observable<any> {
    return this.http.get<Pedido>(
      this.URL_BASE + '/mesa/getpedidomesa/' + id
    );
  }

  removePedidoMesa(idMesa: number, idPedido: number): Observable<any> {
    return this.http.put<any>(
      this.URL_BASE + `/mesa/removepedido/${idMesa}/${idPedido}`,
      true
    );
  }

  tempoMesa(idPedido: number, tempoIdeal: Date, now: Date, pedido: Pedido): Observable<any> {
    return this.http.put<Pedido>(
      this.URL_BASE + `/pedido/addtempo/${idPedido}/${tempoIdeal.getTime()}/${now.getTime()}`,
      pedido
    );
  }

  getMesaByTime(): Observable<any> {
    return this.http.get<Mesa[]>(
      this.URL_BASE + `/mesa/mesasbytime/${this.authService.loggedUser().idRestaurante}`
    )
  }

  timerPedido(): Observable<any> {
    return this.http.put<Mesa[]>(
      this.URL_BASE + `/mesa/diminuirtempo/${this.authService.loggedUser().idRestaurante}`, true
    )
  }

  removeClienteMesa(idMesa: number): Observable<any>{
    return this.http.put<any>(
      this.URL_BASE + `/mesa/mesaremovecliente/${idMesa}`, true
    )
  }

  atenderCliente(idMesa: number): Observable<any>{
    return this.http.put<any>(
      this.URL_BASE + `/mesa/clienteatendido/${idMesa}`, true
    )
  }
}
