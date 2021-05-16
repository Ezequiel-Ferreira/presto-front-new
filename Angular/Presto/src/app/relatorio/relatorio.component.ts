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

  @ViewChild("exportar") exportar: ElementRef;
  produtos: Produto[];
  ngOnInit(): void {
    this.produtoService.produtos().subscribe(
      produtos => {
        this.produtos = produtos;
      }
    )
  }

  gerarPdf() {

    var element = document.getElementById('table');

    html2canvas(element).then((canvas) => {

      var imageData = canvas.toDataURL('/image/png')

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [18, 10]
      });

      doc.addImage(imageData, 0, 0, 0, 0);

      doc.save("Relatorio-presto");

    })




  }

}
