import { AuthService } from './../authService/authservice.service';
import { Cardapio } from './cardapio';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../produto/produto';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  produtos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`http://localhost:8080/produto/produtos`);
  }

  criarCardapio(cardapio : Cardapio, id : number){
    return this.http.post<Cardapio>(`http://localhost:8080/cardapio/create/${id}`, cardapio);
  }

  cardapio() : Observable<any>{
    return this.http.get<Cardapio>(`http://localhost:8080/cardapio/getbyid/${this.authService.loggedUser().id}`);
  }
  produtosCardapio() : Observable<any>{
    return this.http.get<Cardapio>(`http://localhost:8080/cardapio/getprodutoscardapio/${this.authService.loggedUser().id}`);
  }


  // produtoPorId(id: number): Observable<Produto> {
  //   return this.http.get<Produto>(`http://localhost:8080/produto/${id}`)
  // }

  produtoPorTipo(tipo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`http://localhost:8080/cardapio/getfiltro/${this.authService.loggedUser().id}/${tipo}`);
  }

  addProdutoNoCardapio(nome : String, produto : Produto){
     return this.http.put(`http://localhost:8080/cardapio/addproduto/${nome}`, produto);
  }

  removeProduto(nome: String, produto: Produto ): Observable<any> {
    console.log("service", produto.nome);
    return this.http.put<any>(`http://localhost:8080/cardapio/remove/${nome}`, produto);
  }
}
