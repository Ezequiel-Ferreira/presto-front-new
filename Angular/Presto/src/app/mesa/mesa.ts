import { Pedido } from '../pedidos/pedido';
import { Restaurante } from '../restaurante/restaurante';
export class Mesa {
  id: number;
  nome: string;
  pedido: Pedido;
  mesaRestaurante: Restaurante;
}
