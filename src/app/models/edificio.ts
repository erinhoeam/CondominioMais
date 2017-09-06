import { Configuracao } from './configuracao';
import { EnderecoEdificio } from './endereco-edificio';
export class Edificio{
    id:String;
    nome:String;
    cnpj:String;
    endereco:EnderecoEdificio;
    configuracao:Configuracao;
}