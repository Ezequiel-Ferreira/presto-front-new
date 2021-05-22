import { AuthService } from './../../authService/authservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastroproduto',
  templateUrl: './cadastroproduto.component.html',
  styleUrls: ['./cadastroproduto.component.css']
})
export class CadastroprodutoComponent implements OnInit {

  produtoForm: FormGroup;
  data: any;
  produto: Produto;

  produtos: Produto[];

  imagemForm: FormGroup;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  message: string;
  imageName: any;
  formData = new FormData();

  constructor(private fb: FormBuilder, private prod: ProdutoService, private authService: AuthService, private fbImagem: FormBuilder) { }

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      valor: [Number, [Validators.required]],
      tempo: [Number, [Validators.required]],
      quantidadeEstoque: [Number],
      imagem: ['', [Validators.required]]
    })

    this.imagemForm = this.fbImagem.group({
      profile: ['']
    })
  }


  atualizar() {
    this.prod.produtos().subscribe(
      produtos => {
        this.produtos = produtos;
      }
    )
  }

  public onFileChanged(event) {
    //Select File
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imagemForm.get('profile').setValue(file);
    }
  }

  inserirProduto() {
    this.formData.append('nome', this.produtoForm.get('nome').value);
    this.formData.append('tipo', this.produtoForm.get('tipo').value);
    this.formData.append('descricao', this.produtoForm.get('descricao').value);
    this.formData.append('tempo', this.produtoForm.get('tempo').value);
    this.formData.append('valor', this.produtoForm.get('valor').value);
    this.formData.append('quantidadeEstoque', this.produtoForm.get('quantidadeEstoque').value);
    this.formData.append('imagem', this.produtoForm.get('imagem').value);
    this.formData.append('file', this.imagemForm.get('profile').value);
  }
}
