import { Cardapio } from '../cardapio/cardapio';
export interface Produto {
  id : number;
  nome: string;
  tipo: string;
  valor: number;
  descricao: string;
  tempo: string;
  imagem: string;
  cardapios: Cardapio;
  retornoDoCardapio_id: number;
  quantidadeEstoque: number;
  contador: number;
}
