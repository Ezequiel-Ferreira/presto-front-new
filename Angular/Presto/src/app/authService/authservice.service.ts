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

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApi {
  mostrarMenuEmitter = new EventEmitter<Boolean>()
  usuarioAutenticado: boolean = false
  retornoSenha: boolean = true
  jwtHelper?: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router, public storage: StorageService) {
    super();
  }

  login(credentials: CredentialsDTO): Observable<any> {
    console.log(credentials)
    return this.http.post<any>(
      this.URL_BASE + '/login',
      credentials,
      {
        observe: 'response'
      })
      .pipe(
        map(usuario => {
          console.log(usuario)
          this.succesfulLogin(usuario.headers.get('Authorization'));
          this.router.navigate(['/home']);
          return usuario;
        }));
  }

  succesfulLogin(authorizationValue: string) {
    console.log(authorizationValue);
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }

  loggedUser(): LocalUser {
    return JSON.parse(localStorage.getItem('localUser'));
  }
}
