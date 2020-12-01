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
    this.mesaService.getAllMesas().subscribe(
      mesas => {
        this.mesas = mesas;
      }
    )

    setInterval(() => {
      this.date = new Date();
    }, 1000)

  }

  load() {
    this.mesaService.getAllMesas().subscribe(
      mesas => {
        this.mesas = mesas;
      }
    )
  }

  entreguePedido(idMesa: number, idPedido: number) {
    this.mesaService.removePedidoMesa(idMesa, idPedido).subscribe(
      entrega => {

      },
      error => {
        this.load();
      }
    )
  }

}
