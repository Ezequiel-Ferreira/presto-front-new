import { BaseApi } from './base-apis';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtHelperService } from '@auth0/angular-jwt'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SwitchComponent } from './switch/switch.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GuardRouters } from './guard/guardRouters';
import { ProdutoComponent } from './produto/produto.component';
import { CardapioComponent } from './cardapio/cardapio.component';

import { CadastroprodutoComponent } from './produto/cadastroproduto/cadastroproduto.component';
import { ProdutoCardapioComponent } from './cardapio/produto-cardapio/produto-cardapio.component';
import { MesaComponent } from './mesa/mesa.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { CozinhaComponent } from './cozinha/cozinha.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { AuthService } from './authService/authservice.service';
import { StorageService } from './storageService/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PedidosComponent,
    CadastroComponent,
    SwitchComponent,
    ProdutoComponent,
    CardapioComponent,
    CadastroprodutoComponent,
    ProdutoCardapioComponent,
    MesaComponent,
    ListarUsuarioComponent,
    CozinhaComponent,
    RelatorioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    GuardRouters,
    JwtHelperService,
    AuthService,
    StorageService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
