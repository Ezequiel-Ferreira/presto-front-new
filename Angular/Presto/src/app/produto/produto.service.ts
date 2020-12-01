import { AuthService } from './../authService/authservice.service';
import { Cardapio } from './../cardapio/cardapio';
import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  produtos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      'http://localhost:8080/produto/produtousuario/' +
        this.authService.loggedUser().id
    );
  }
  adicionarProdutoNocardapio(produto: Produto): Observable<any> {
    return this.http.put<Cardapio>(
      'http://localhost:8080/cardapio/addproduto/' +
        this.authService.loggedUser().id,
      produto
    );
  }

  addProduto(produto: FormData): Observable<any> {
    return this.http.post<Produto>(
      'http://localhost:8080/produto/create/' +
        this.authService.loggedUser().id,
      produto
    );
  }

  // addProduto(produto: Produto, file: File):  Observable <any>{
  //   return this.http.post<Produto>("http://localhost:8080/produto/create", produto, file);
  // }

  updateProduto(produto: FormData, id: number): Observable<any> {
    return this.http.put<Produto>(
      'http://localhost:8080/produto/update/' + id,
      produto
    );
  }
  updateProdutoSemImagem(produto: Produto, id: number): Observable<any> {
    return this.http.put<Produto>(
      'http://localhost:8080/produto/updatesemimagem/' + id,
      produto
    );
  }

  deleteProduto(id: Number): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/produto/delete/' + id);
  }

  // uploadImage(file: File): Observable<any> {
  //   console.log(file.name);
  //   return this.http.post<any>("http://localhost:8080/image/create", file, { observe: 'response' });
}
