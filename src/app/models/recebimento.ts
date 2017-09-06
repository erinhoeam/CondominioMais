import { Cliente } from './cliente';
import { CentroCusto } from './centrocusto';
import { Apartamento } from './apartamento';
import { Edificio } from './edificio';
export class Recebimento{
    id:String;
    edificioId:String;
    apartamentoId:String;
    centroCustoId:String;
    clienteId:String;
    dataVencimento:Date;
    codigoBarras:String;
    linhaDigitavel:String;
    valorRecebimento:number;
    valorPago:number;
    tipoRecebimento:number;
    nossoNumero:String;
    nossoNumeroComDigito:String;
    pago:boolean;

    edificio:Edificio;
    apartamento:Apartamento;
    centroCusto:CentroCusto;
    cliente:Cliente;
}