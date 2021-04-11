import { BaseApi } from './../base-apis';
import { AuthService } from './../authService/authservice.service';
import { Cardapio } from './../cardapio/cardapio';
import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseApi{
  url =  this.URL_BASE+'';

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  produtos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      this.URL_BASE+'/produto/produtousuario/' +
        this.authService.loggedUser().id
    );
  }
  adicionarProdutoNocardapio(produto: Produto): Observable<any> {
    return this.http.put<Cardapio>(
       this.URL_BASE+'/cardapio/addproduto/' +
        this.authService.loggedUser().id,
      produto
    );
  }

  addProduto(produto: FormData): Observable<any> {
    return this.http.post<Produto>(
       this.URL_BASE+'/produto/create/' +
        this.authService.loggedUser().id,
      produto
    );
  }

  // addProduto(produto: Produto, file: File):  Observable <any>{
  //   return this.http.post<Produto>( this.URL_BASE+"/produto/create", produto, file);
  // }

  updateProduto(produto: FormData, id: number): Observable<any> {
    return this.http.put<Produto>(
       this.URL_BASE+'/produto/update/' + id,
      produto
    );
  }
  updateProdutoSemImagem(produto: Produto, id: number): Observable<any> {
    return this.http.put<Produto>(
       this.URL_BASE+'/produto/updatesemimagem/' + id,
      produto
    );
  }

  deleteProduto(id: Number): Observable<any> {
    return this.http.delete<any>( this.URL_BASE+'/produto/delete/' + id);
  }

  // uploadImage(file: File): Observable<any> {
  //   console.log(file.name);
  //   return this.http.post<any>( this.URL_BASE+"/image/create", file, { observe: 'response' });
}
