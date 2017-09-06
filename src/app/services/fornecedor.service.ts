import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { Fornecedor } from './../models/fornecedor';

@Injectable()
export class FornecedorService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }

  novo(entity: Fornecedor) : Observable<Fornecedor>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}fornecedor`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  
  atualizar(entity: Fornecedor) : Observable<Fornecedor>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}fornecedor`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  listar() : Observable<Fornecedor[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}fornecedor`, options)
                        .map((res:Response) => <Fornecedor[]>res.json())
                        .catch(super.serviceError);
  }

  obter(id:String) : Observable<Fornecedor>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}fornecedor/${id}`, options)
                        .map((res:Response) => <Fornecedor>res.json())
                        .catch(super.serviceError);
  }
}