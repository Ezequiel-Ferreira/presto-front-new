import { BaseApi } from './../base-apis';
import { AuthService } from './../authService/authservice.service';
import { Cardapio } from './cardapio';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../produto/produto';

@Injectable({
  providedIn: 'root'
})
export class CardapioService extends BaseApi {

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  produtos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.URL_BASE}/produto/produtos`);
  }

  criarCardapio(cardapio: Cardapio, id: number) {
    return this.http.post<Cardapio>(`${this.URL_BASE}/cardapio/create/${id}`, cardapio);
  }

  cardapio(): Observable<any> {
    return this.http.get<Cardapio>(`${this.URL_BASE}/cardapio/getbyid/${this.authService.loggedUser()}`);
  }
  produtosCardapio(): Observable<any> {
    return this.http.get<Cardapio>(`${this.URL_BASE}/cardapio/getprodutoscardapio/${this.authService.loggedUser()}`);
  }

  produtosPorNomeCardapio(nome: String): Observable<any> {
    return this.http.get<Produto[]>(`${this.URL_BASE}/cardapio/produtoscardapiobyname/${this.authService.loggedUser()}/${nome}`);
  }

  produtoPorTipo(tipo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.URL_BASE}/cardapio/getfiltro/${this.authService.loggedUser()}/${tipo}`);
  }

  addProdutoNoCardapio(nome: String, produto: Produto) {
    return this.http.put(`${this.URL_BASE}/cardapio/addproduto/${nome}`, produto);
  }

  removeProduto(produto: Produto): Observable<any> {
    return this.http.put<any>(`${this.URL_BASE}/cardapio/remove/${this.authService.loggedUser()}`, produto);
  }
}
