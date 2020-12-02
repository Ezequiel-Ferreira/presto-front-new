import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Mesa } from '../mesa/mesa';
import { MesaService } from '../mesa/mesaService';

@Component({
  selector: 'app-cozinha',
  templateUrl: './cozinha.component.html',
  styleUrls: ['./cozinha.component.css']
})
export class CozinhaComponent implements OnInit {

  constructor(private mesaService: MesaService) { }

  mesas: Mesa[];

  public date = new Date();


  ngOnInit(): void {
    this.mesaService.getMesaByTime().subscribe(
      mesas => {
        console.log(mesas)
        this.mesas = mesas;
      }
    )
    // this.mesaService.getAllMesas().subscribe(
    //   mesas => {
    //     console.log(mesas)
    //     this.mesas = mesas;
    //   }
    // )

    setInterval(() => {
      this.date = new Date();
    }, 1000);

    setInterval(() => {
      this.mesaService.timerPedido().subscribe(
        retornoTimer => {
          // console.log(retornoTimer);
          this.mesas = retornoTimer;
        }
      )
    }, 60000);

  }



  load() {
    this.mesaService.getMesaByTime().subscribe(
      mesas => {
        this.mesas = mesas;
      }
    )
  }

  entreguePedido(idMesa: number, idPedido: number) {
    this.mesaService.removePedidoMesa(idMesa, idPedido).subscribe(
      (entrega) => {
        this.load();
      },
      (error) => {
        this.load();
      }
    )
  }

}
