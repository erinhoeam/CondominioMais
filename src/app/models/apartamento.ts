import { Morador } from './morador';
import { Edificio } from './edificio';
export class Apartamento{
    id:String;
    numero:Number;
    edificioId:String;
    moradorId:String;
    edificio:Edificio;
    morador:Morador;
    percentual:Number;
}