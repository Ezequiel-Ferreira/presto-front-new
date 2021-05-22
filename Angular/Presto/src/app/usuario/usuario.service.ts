import { BaseApi } from './../base-apis';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseApi {

  constructor(private http: HttpClient) {
    super();
  }


  httpOptions = {
    header: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL_BASE + "/usuario/usuarios")
  }

  getUsuarioByEmail(email: String): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL_BASE + "/usuario/getemail/" + email)
  }

  update(usuario: Usuario): Observable<any> {
    return this.http.put(this.URL_BASE, usuario).pipe(
      tap(updateU => console.log(`usuario atualizado email=${usuario.email}`))
    )
  }

  addUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(this.URL_BASE + + "/usuario/create", usuario).pipe(
      tap((newUsuario: Usuario) => console.log(`usuario adicionado email= ${newUsuario.email}`))
    )
  }

  redefinirSenha(email: String): Observable<any> {
    return this.http.put<any>("http://localhost:8080/usuario/redefinirsenha/" + email, true)
  }

}
