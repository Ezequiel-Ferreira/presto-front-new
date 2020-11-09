import { CardapioService } from './../cardapio/cardapio.service';
import { Usuario } from './../usuario/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';
import { delay, timeout } from 'rxjs/operators';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuarioForm: FormGroup;
  cardapioFrom: FormGroup;

  data: any;

  usuario: Usuario;

  errorMessage = "";

  successMessage = "";

  loading = false;

  mostrarModalCardapioCriar : boolean = false;

  constructor(private fb: FormBuilder, private fbCardapio: FormBuilder, private cardapioService: CardapioService, private us: UsuarioService, private route: Router) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      confemail: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required]
    });

    this.cardapioFrom = this.fbCardapio.group({
      nome:['']
    })


  }

  // inserir() {
  //   console.log(this.usuarioForm.value);
  //   this.us.insert(this.usuarioForm.value);
  // }


  inserirUsuario() {
    this.us.addUsuario(this.usuarioForm.value).subscribe(
      (response) => {
        console.log('response received')
        this.usuario = response;
        this.successMessage = response;
        this.mostrarModalCardapioCriar = true;
      },
      (error) => {
        console.log('error caught in component')
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  obter() {
    this.data = this.usuarioForm.value;
    this.us = this.data;
  }

  criarCardapio(){
    console.log(this.cardapioFrom.value);
    this.cardapioService.criarCardapio(this.cardapioFrom.value, this.usuario.id).subscribe(
      response => {
        console.log(response);
        this.mostrarModalCardapioCriar  = false;
        setTimeout(() => { this.route.navigate(['/login']); }, 10000)
      }
    )
  }

  confereEmailValidator(email){
    if (this.usuarioForm.value.email === this.usuarioForm.value.confemail) {
        return true;
    }
    return false;
  }
}
