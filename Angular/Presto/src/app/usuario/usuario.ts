import { Restaurante } from '../restaurante/restaurante';
export class Usuario {
  id: number;
  nome: String;
  email: String;
  confemail: String;
  senha: String;
  dataNascimento: String;
  restaurantes: Restaurante[];
}
