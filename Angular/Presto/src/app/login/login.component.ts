import { UsuarioService } from './../usuario/usuario.service';
import { AuthService } from './../authService/authservice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any;
  usuario: Usuario;
  emailRedef = "";
  errorMessage = "";
  successMessage = "";
  errorMessageLogin = "";
  successMessageLogin = "";
  loading = false;
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private usuarioSevice: UsuarioService, private route: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        senha: ['', [Validators.required]]
      }
    );
  }

  login() {
    this.authService.login(this.signInForm.value).subscribe(
      retorno => {
        if (retorno) {
          this.successMessageLogin = "Login efetuado com sucesso";
          setTimeout(() => { this.route.navigate(['/pedidos']); }, 2000)
        } else {
          this.errorMessageLogin = "Usuario e senha invalido"
          this.loading = false
        }
      },
      (error) => {
        this.errorMessageLogin = error
        this.loading = false
      }
    );
  }

  loggedUser() {
    this.authService.loggedUser()
  }

  async enviarSenhaPorEmail() {
    this.usuarioSevice.redefinirSenha(this.emailRedef).subscribe(
      (response) => {
        this.successMessage = response;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
