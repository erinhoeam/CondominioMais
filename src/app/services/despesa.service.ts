import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { Despesa } from './../models/despesa';

@Injectable()
export class DespesaService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }

  novo(entity: Despesa) : Observable<Despesa>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}despesa`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  
  atualizar(entity: Despesa) : Observable<Despesa>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}despesa`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  listar(mes:number,ano:number) : Observable<Despesa[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}despesa/${mes}/${ano}`, options)
                        .map((res:Response) => <Despesa[]>res.json())
                        .catch(super.serviceError);
  }

  obter(id:String) : Observable<Despesa>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}despesa/${id}`, options)
                        .map((res:Response) => <Despesa>res.json())
                        .catch(super.serviceError);
  }
  baixar(entity:Despesa) : Observable<Despesa>{
      let options = this.obterAuthHeader();
  
      let response = this.http
          .put(`${this.UrlServiceV1}baixar-despesa`, entity, options)
          .map(super.extractData)
          .catch(super.serviceError);
  
      return response;
  }
}