import { BaseApi } from './../base-apis';
import { AuthService } from './../authService/authservice.service';
import { Cardapio } from './../cardapio/cardapio';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseApi {
  url = this.URL_BASE + '';

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  produtos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      this.URL_BASE + '/produto/produtousuario/' +
      this.authService.loggedUser()
    );
  }

  adicionarProdutoNocardapio(produto: Produto): Observable<any> {
    return this.http.put<Cardapio>(
      this.URL_BASE + '/cardapio/addproduto/' +
      this.authService.loggedUser(),
      produto
    );
  }

  addProduto(produto: FormData): Observable<any> {
    return this.http.post<Produto>(
      this.URL_BASE + '/produto/create/' +
      this.authService.loggedUser(),
      produto
    );
  }

  updateProduto(produto: FormData, id: number): Observable<any> {
    return this.http.put<Produto>(
      this.URL_BASE + '/produto/update/' + id,
      produto
    );
  }

  updateProdutoSemImagem(produto: Produto, id: number): Observable<any> {
    return this.http.put<Produto>(
      this.URL_BASE + '/produto/updatesemimagem/' + id,
      produto
    );
  }

  deleteProduto(id: Number): Observable<any> {
    return this.http.delete<any>(this.URL_BASE + '/produto/delete/' + id);
  }
}
