import { Mesa } from '../mesa/mesa';
import { Produto } from '../produto/produto';

export interface Pedido {
  id: number;
  nome: string;
  descricao: string;
  valorTotal : number;
  mesas: Mesa[];
  itensDoPedido: Produto[];
  maiorTempo : number;
  tempoIdeal:number;
}
