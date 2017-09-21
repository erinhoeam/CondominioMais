import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { Recebimento } from './../models/recebimento';
import { RecebimentoBoletoUsuario } from './../models/recebimento-boletos-usuarios';
import { ApartamentoBoleto } from './../models/apartamento-boleto';
import { RecebimentoBoletos } from './../models/recebimento-boletos';
import { RecebimentoInadimplente } from './../models/recebimento-inadimplente';


@Injectable()
export class RecebimentoService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }

  novo(entity: Recebimento) : Observable<Recebimento>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}recebimento`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  boletos(entity: RecebimentoBoletos) : Observable<RecebimentoBoletos>{
    let options = this.obterAuthHeader();

    let response = this.http
        .post(`${this.UrlServiceV1}recebimento-gerar-boletos`, entity, options)
        .map(super.extractData)
        .catch(super.serviceError);

    return response;
 }
  
  atualizar(entity: Recebimento) : Observable<Recebimento>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}recebimento`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  baixar(entity:Recebimento) : Observable<Recebimento>{
    let options = this.obterAuthHeader();

    let response = this.http
        .put(`${this.UrlServiceV1}baixar-recebimento`, entity, options)
        .map(super.extractData)
        .catch(super.serviceError);

    return response;
}

  listar(mes:number,ano:number) : Observable<Recebimento[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}recebimento/${mes}/${ano}`, options)
                        .map((res:Response) => <Recebimento[]>res.json())
                        .catch(super.serviceError);
  }

  listarInadimplentes() : Observable<RecebimentoInadimplente[]>{
    let options = this.obterAuthHeader();

    return this.http.get(`${this.UrlServiceV1}recebimento-inadimplentes`, options)
                    .map((res:Response) => <RecebimentoInadimplente[]>res.json())
                    .catch(super.serviceError);
}
  
  listarBoletosUsuario() : Observable<ApartamentoBoleto[]>{
    let options = this.obterAuthHeader();

    return this.http.get(`${this.UrlServiceV1}boletos-usuario`, options)
                    .map((res:Response) => <ApartamentoBoleto[]>res.json())
                    .catch(super.serviceError);
}

  obter(id:String) : Observable<Recebimento>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}recebimento/${id}`, options)
                        .map((res:Response) => <Recebimento>res.json())
                        .catch(super.serviceError);
  }
  boleto(id:string):Observable<Recebimento>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

     let response = this.http
         .get(this.UrlServiceV1 + `boleto/${id}`, options)
         .map((res:Response) => <Recebimento>res.json())
         .catch(super.serviceError);

     return response;
  }
}