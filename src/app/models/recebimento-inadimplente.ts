import { Cliente } from './cliente';
import { Apartamento } from './apartamento';
export class RecebimentoInadimplente{
    id:String;
    valorRecebimento:number;
    valorPago:number;
    dataVencimento:Date;
    tipoRecebimento:number;
    recebimento:String;
    diasEmAtraso:number;
    pago:number;

    apartamento:Apartamento;
    cliente:Cliente;
}