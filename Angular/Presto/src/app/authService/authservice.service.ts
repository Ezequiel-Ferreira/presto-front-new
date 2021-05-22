import { BaseApi } from './../base-apis';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CredentialsDTO } from '../models/credentials.dto';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalUser } from '../models/local_user';
import { StorageService } from '../storageService/storage.service';
import { Usuario } from '../usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApi {
  mostrarMenuEmitter = new EventEmitter<Boolean>()
  retornoSenha: boolean = true
  jwtHelper?: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router, public storage: StorageService) {
    super();
  }

  login(credentials: CredentialsDTO): Observable<any> {
    return this.http.post<any>(
      this.URL_BASE + '/login',
      credentials,
      {
        observe: 'response'
      })
      .pipe(
        map(usuario => {
          this.succesfulLogin(usuario.headers.get('Authorization'));
          this.router.navigate(['/pedidos']);
          return usuario;
        }));
  }

  succesfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    this.http.get<Usuario>(this.URL_BASE + '/usuario/' + this.jwtHelper.decodeToken(tok).sub).pipe(map(user => {
      return user.restaurantes[0].id;
    })).subscribe(number => {
      let user: LocalUser = {
        token: tok,
        email: this.jwtHelper.decodeToken(tok).sub,
        idRestaurante: number,
      };
      this.storage.setLocalUser(user);
    });
  }

  logout() {
    this.storage.setLocalUser(null);
  }

  loggedUser(): LocalUser {
    return JSON.parse(localStorage.getItem('localUser'));
  }
}
