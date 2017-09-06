import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { Edificio } from './../models/edificio';

@Injectable()
export class EdificioService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }

  novo(entity: Edificio) : Observable<Edificio>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}edificio`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  
  atualizar(entity: Edificio) : Observable<Edificio>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}edificio`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  listar() : Observable<Edificio[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}edificio`, options)
                        .map((res:Response) => <Edificio[]>res.json())
                        .catch(super.serviceError);
  }

  obter(id:String) : Observable<Edificio>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}edificio/${id}`, options)
                        .map((res:Response) => <Edificio>res.json())
                        .catch(super.serviceError);
  }
}