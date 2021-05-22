import { Cardapio } from '../cardapio/cardapio';
import { Produto } from '../produto/produto';
import { Mesa } from '../mesa/mesa';
import { Usuario } from '../usuario/usuario';

export class Restaurante {
    id: number;
    nome: string;
    cardapio: Cardapio;
    produto: Produto[];
    mesa: Mesa[];
    usuario: Usuario;
}
