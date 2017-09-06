import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { Cliente } from './../models/cliente';

@Injectable()
export class ClienteService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }

  novo(entity: Cliente) : Observable<Cliente>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}cliente`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  
  atualizar(entity: Cliente) : Observable<Cliente>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}cliente`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  listar() : Observable<Cliente[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}cliente`, options)
                        .map((res:Response) => <Cliente[]>res.json())
                        .catch(super.serviceError);
  }

  obter(id:String) : Observable<Cliente>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}cliente/${id}`, options)
                        .map((res:Response) => <Cliente>res.json())
                        .catch(super.serviceError);
  }
}