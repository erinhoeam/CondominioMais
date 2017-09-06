import { CentroCusto } from './centrocusto';
import { Fornecedor } from './fornecedor';
import { Edificio } from './edificio';
export class Despesa{
    id:String;
    edificioId:String;
    fornecedorId:String;
    centroCustoId:String;
    dataVencimento:Date;
    valorDespesa:number;
    edificio:Edificio;
    fornecedor:Fornecedor;
    centroCusto:CentroCusto;
}