
import { Component,  OnInit } from '@angular/core';
import { Produto } from './produto';
import { ProdutoService } from './produto.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  id:number;
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

  //Icones
  faPlus = faPlus;

  constructor(private produtoService: ProdutoService, private fb: FormBuilder, private fbImage: FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
    this.produtoService.produtos().subscribe(
      produtosLista => {
        this.produtos = produtosLista;
        console.log(produtosLista);
      }
    );

    this.updateProdutoForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tempo: ['', [Validators.required]],
      valor: ['', Validators.required],
      quantidadeEstoque:[Number],
      imagem: ['']
    })

    this.imageForm = this.fbImage.group({
      profile: ['']
    })
  }

  load() {
    this.produtoService.produtos().subscribe(
      produtosLista => {
        this.produtos = produtosLista;
      }
    );
  }

  atualizarTodaPagina() {
    sessionStorage.refresh = true;
    console.log('sessionStorage', sessionStorage);
    (sessionStorage.refresh == 'true' || !sessionStorage.refresh)
        && location.reload();
    sessionStorage.refresh = false;
  }

  capturaId(id: number){
    console.log(id);
    this.id = id;
  }

  updateProduto(id: number) {
    // this.produtoService.updateProduto(this.updateProdutoForm.value, nome).subscribe(
    //   produtoAtualizado => {console.log(produtoAtualizado)}
    if(this.imageForm.get('profile').value != ''){
      this.formData.append('nome', this.updateProdutoForm.get('nome').value);
      this.formData.append('descricao', this.updateProdutoForm.get('descricao').value);
      this.formData.append('tempo', this.updateProdutoForm.get('tempo').value);
      this.formData.append('valor', this.updateProdutoForm.get('valor').value);
      this.formData.append('quantidadeEstoque', this.updateProdutoForm.get('quantidadeEstoque').value);
      this.formData.append('imagem', this.updateProdutoForm.get('imagem').value);
      this.formData.append('file', this.imageForm.get('profile').value);

     this.produtoService.updateProduto(this.formData, id).subscribe(
       retorno =>{
        console.log(retorno);
        this.load();
       }
     );
    }else if(this.imageForm.get('profile').value === ''){
      this.produtoService.updateProdutoSemImagem(this.updateProdutoForm.value, id).subscribe(
        retorno =>{
          console.log(retorno);
          this.atualizarTodaPagina();
          this.load();
        }
      )
    }
  }


  addNoCardapio(produto : Produto){
    this.produtoService.adicionarProdutoNocardapio(produto).subscribe(
      produtoadcionado => {
        this.produto = produtoadcionado;
        this.load();
      },
      error =>{
        console.log(error);
        alert("Produto já no cardapio");
      }

    )
  }

  deletarProduto(id: Number) {
    this.produtoService.deleteProduto(id).subscribe(
      produtoDeletado => {
        this.produtos = produtoDeletado;
        this.load();
      },
      error => {
        this.load();
      }
    )
  }

  public onFileChanged(event) {
    //Select File
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageForm.get('profile').setValue(file);
    }
  }

  // Edit product
  // public onFileChanged(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.imageForm.get('profile').setValue(file);
  //   }
  // }


  // uploadarImage(file: File) {
  //   this.produtoService.uploadImage(file).subscribe(
  //     (response) => {
  //       if (response.status === 500) {
  //         console.log("Upload bem sucedido");
  //       } else {
  //         console.log("Upload mal sucedido");
  //       }
  //     }
  //   );
  // }
}
