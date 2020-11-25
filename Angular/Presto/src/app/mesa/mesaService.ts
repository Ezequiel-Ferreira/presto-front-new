import { AuthService } from './../authService/authservice.service';
import { Mesa } from './mesa';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../pedidos/pedido';
import { Produto } from '../produto/produto';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private http: HttpClient, private authService : AuthService) { }
// Chamadas para mesa
  getAllMesas() : Observable<any>{
    return this.http.get<any>("http://localhost:8080/mesa/mesausuario/" + this.authService.loggedUser().id)
  }

  criarMesa(mesa : Mesa): Observable<any>{
    return this.http.post<any>("http://localhost:8080/mesa/create/" + this.authService.loggedUser().id , mesa)
  }
  addPedidoMesa(id: number, pedido: Pedido): Observable<Pedido>{
    return this.http.put<Pedido>("http://localhost:8080/mesa/addpedido/" + id, pedido)
  }

  // Chamadas para pedidos
  criarPedido(pedido: Pedido): Observable<Pedido>{

    return this.http.post<Pedido>("http://localhost:8080/pedido/create", pedido)
  }

  addProdutosPedido(produtos: Produto[], id: number): Observable<any> {

    return this.http.put<any>("http://localhost:8080/pedido/addprodutos/" + id, produtos);
  }

  atualizarProdutosPedido(produtos: Produto[], id: number): Observable<any> {
    return this.http.put<any>("http://localhost:8080/pedido//updateitensdopedido/" + id, produtos);
  }

  pedidoDaMesa(id: number): Observable<any>{
    return this.http.get<Pedido>("http://localhost:8080/mesa/getpedidomesa/" + id)
  }

  removePedidoMesa(idMesa: number, idPedido: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/mesa/removepedido/${idMesa}/${idPedido}`, true)
  }

  tempoMesa(idPedido: number, tempoIdeal: Date): Observable<any> {
    return this.http.put<Pedido>(`http://localhost:8080/pedido/addtempo/${idPedido}/${tempoIdeal.getTime()}`, true);
  }
}
