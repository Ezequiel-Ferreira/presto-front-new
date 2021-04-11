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

  criarCardapio(cardapio : Cardapio, id : number){
    return this.http.post<Cardapio>(`${this.URL_BASE}/cardapio/create/${id}`, cardapio);
  }

  cardapio() : Observable<any>{
    return this.http.get<Cardapio>(`${this.URL_BASE}/cardapio/getbyid/${this.authService.loggedUser().id}`);
  }
  produtosCardapio() : Observable<any>{
    return this.http.get<Cardapio>(`${this.URL_BASE}/cardapio/getprodutoscardapio/${this.authService.loggedUser().id}`);
  }

  produtosPorNomeCardapio(nome: String) : Observable<any>{
    return this.http.get<Produto[]>(`${this.URL_BASE}/cardapio/produtoscardapiobyname/${this.authService.loggedUser().id}/${nome}`);
  }


  // produtoPorId(id: number): Observable<Produto> {
  //   return this.http.get<Produto>(`http://localhost:8080/produto/${id}`)
  // }

  produtoPorTipo(tipo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.URL_BASE}/cardapio/getfiltro/${this.authService.loggedUser().id}/${tipo}`);
  }

  addProdutoNoCardapio(nome : String, produto : Produto){
     return this.http.put(`${this.URL_BASE}/cardapio/addproduto/${nome}`, produto);
  }

  removeProduto(produto: Produto ): Observable<any> {
    console.log("service", produto.nome);
    return this.http.put<any>(`${this.URL_BASE}/cardapio/remove/${this.authService.loggedUser().id}`, produto);
  }
}
