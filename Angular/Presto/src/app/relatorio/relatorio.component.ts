import { ProdutoService } from './../produto/produto.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Produto } from '../produto/produto';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  constructor(private produtoService: ProdutoService) { }

  @ViewChild("exportar") exportar : ElementRef;
  produtos: Produto[];
  ngOnInit(): void {
    this.produtoService.produtos().subscribe(
      produtos => {
        this.produtos = produtos;
      }
    )
  }

  gerarPdf(){

    var element = document.getElementById('table')

    html2canvas(element).then((canvas) =>{

      var imageData = canvas.toDataURL('/image/png')

      const doc = new jsPDF();

      doc.addImage(imageData, 0, 0, 0, 0);

      doc.save("image.pdf");
    })

    // let doc = new jsPDF();
    // let specialElementHandedlers = {
    //   'editor' : function(element, renderer){
    //     true;
    //   }
    // };
    // let content = this.exportar.nativeElement;
    // doc.fromHTML(content.innerHTML, 15, 15, {
    //   'whidth' : 190,
    //   'elementHandelers': specialElementHandedlers
    // });

    // doc.save('test-pdf');
  }

}
