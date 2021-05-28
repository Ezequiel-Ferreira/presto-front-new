import { CardapioService } from './../cardapio/cardapio.service';
import { Usuario } from './../usuario/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';
import { delay, timeout } from 'rxjs/operators';
import { RestauranteService } from '../restaurante/restaurante.service';
import { Restaurante } from '../restaurante/restaurante';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  restaurants: Restaurante[];
  idAdmin: Number;
  usuarioForm: FormGroup;
  cardapioFrom: FormGroup;
  data: any;
  usuario: Usuario;
  errorMessage = "";
  successMessage = "";
  loading = false;
  mostrarModalCardapioCriar: boolean = false;

  constructor(private fb: FormBuilder, private fbCardapio: FormBuilder, private cardapioService: CardapioService, private us: UsuarioService, private route: Router, private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      confemail: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      nomeRestaurante: ['', Validators.required]
    });

    this.restauranteService.getAllRestaurants().subscribe(
      response => {
        this.restaurants = response
      }
    )
  }

  inserirUsuario() {
    console.log(this.usuarioForm.value)
    this.us.addUsuario(this.usuarioForm.value, this.idAdmin).subscribe(
      (response) => {
        this.usuario = response;
        this.successMessage = response;
        this.mostrarModalCardapioCriar = true;
        this.route.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  obter() {
    this.data = this.usuarioForm.value;
    this.us = this.data;
  }

  confereEmailValidator(email) {
    if (this.usuarioForm.value.email === this.usuarioForm.value.confemail) {
      return true;
    }
    return false;
  }
}
