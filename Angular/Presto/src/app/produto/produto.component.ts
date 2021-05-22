import { Component, OnInit } from '@angular/core';
import { Produto } from './produto';
import { ProdutoService } from './produto.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
  id: number;
  updateProdutoForm: FormGroup;
  produtos: Produto[];

  produtoForm: FormGroup;
  data: any;
  produto: Produto;

  imageForm: FormGroup;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  message: string;
  imageName: any;
  formData = new FormData();

  errorMessage = "";
  successMessage = "";
  loading = false;

  //Icones
  faPlus = faPlus;

  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private fbImage: FormBuilder
  ) { }

  ngOnInit(): void {
    this.produtoService.produtos().subscribe((produtosLista) => {
      this.produtos = produtosLista;
    });

    this.updateProdutoForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tempo: [[Validators.required]],
      valor: [[Validators.required]],
      quantidadeEstoque: [[Validators.required]],
      imagem: [''],
    });

    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      tempo: ['', [Validators.required]],
      quantidadeEstoque: ['', [Validators.required]],
      imagem: [''],
    });

    this.imageForm = this.fbImage.group({
      profile: ['', [Validators.required]],
    });
  }


  load() {
    this.produtoService.produtos().subscribe((produtosLista) => {
      this.produtos = produtosLista;
    });
  }

  atualizarTodaPagina() {
    sessionStorage.refresh = true;
    (sessionStorage.refresh == 'true' || !sessionStorage.refresh) &&
      location.reload();
    sessionStorage.refresh = false;
  }

  capturaId(id: number) {
    this.id = id;
  }

  updateProduto(id: number) {
    if (this.imageForm.get('profile').value != '') {
      this.formData.append('nome', this.updateProdutoForm.get('nome').value);
      this.formData.append(
        'descricao',
        this.updateProdutoForm.get('descricao').value
      );
      this.formData.append('tempo', this.updateProdutoForm.get('tempo').value);
      this.formData.append('valor', this.updateProdutoForm.get('valor').value);
      this.formData.append(
        'quantidadeEstoque',
        this.updateProdutoForm.get('quantidadeEstoque').value
      );
      this.formData.append(
        'imagem',
        this.updateProdutoForm.get('imagem').value
      );
      this.formData.append('file', this.imageForm.get('profile').value);

      this.produtoService
        .updateProduto(this.formData, id)
        .subscribe((retorno) => {
          this.load();
        });
    } else if (this.imageForm.get('profile').value === '') {
      this.produtoService
        .updateProdutoSemImagem(this.updateProdutoForm.value, id)
        .subscribe((retorno) => {
          this.atualizarTodaPagina();
          this.load();
        });
    }
  }

  inserirProduto(event: Event) {
    event.preventDefault();
    this.formData.append('nome', this.produtoForm.get('nome').value);
    this.formData.append('tipo', this.produtoForm.get('tipo').value);
    this.formData.append('descricao', this.produtoForm.get('descricao').value);
    this.formData.append('tempo', this.produtoForm.get('tempo').value);
    this.formData.append('valor', this.produtoForm.get('valor').value);
    this.formData.append(
      'quantidadeEstoque',
      this.produtoForm.get('quantidadeEstoque').value
    );
    this.formData.append('imagem', this.produtoForm.get('imagem').value);
    this.formData.append('file', this.imageForm.get('profile').value);

    this.produtoService.addProduto(this.formData).subscribe(
      (response) => {
        this.produto = response;
        this.successMessage = response;
        this.load();
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  addNoCardapio(produto: Produto) {
    this.produtoService.adicionarProdutoNocardapio(produto).subscribe(
      (produtoadcionado) => {
        this.produto = produtoadcionado;
        this.load();
      },
      (error) => {
        alert('Produto já no cardapio');
      }
    );
  }

  deletarProduto(id: Number) {
    this.produtoService.deleteProduto(id).subscribe(
      (produtoDeletado) => {
        this.produtos = produtoDeletado;
        this.load();
      },
      (error) => {
        this.load();
      }
    );
  }

  public onFileChanged(event) {
    //Select File
    if (event.target.files.length > 0) {
      event.preventDefault();
      const file = event.target.files[0];
      this.imageForm.get('profile').setValue(file);
    }
  }
}
