import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { Apartamento } from './../models/apartamento';

@Injectable()
export class ApartamentoService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }

  novo(entity: Apartamento) : Observable<Apartamento>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}apartamento`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  
  atualizar(entity: Apartamento) : Observable<Apartamento>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}apartamento`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  listar(edificioId:String) : Observable<Apartamento[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}listar-apartamento/${edificioId}`, options)
                        .map((res:Response) => <Apartamento[]>res.json())
                        .catch(super.serviceError);
  }
  listarApi() : Observable<Apartamento[]>{
      let options = this.obterAuthHeader();

      return this.http.get(`${this.UrlServiceV1}listar-apartamento-api`, options)
                      .map((res:Response) => <Apartamento[]>res.json())
                      .catch(super.serviceError);
  }
  obter(id:String) : Observable<Apartamento>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}apartamento/${id}`, options)
                        .map((res:Response) => <Apartamento>res.json())
                        .catch(super.serviceError);
  }
}