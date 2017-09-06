import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { CentroCusto } from './../models/centrocusto';

@Injectable()
export class CentroCustoService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }

  novo(entity: CentroCusto) : Observable<CentroCusto>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}centro-custo`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  
  atualizar(entity: CentroCusto) : Observable<CentroCusto>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}centro-custo`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  listar() : Observable<CentroCusto[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}centro-custo`, options)
                        .map((res:Response) => <CentroCusto[]>res.json())
                        .catch(super.serviceError);
  }

  obter(id:String) : Observable<CentroCusto>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}centro-custo/${id}`, options)
                        .map((res:Response) => <CentroCusto>res.json())
                        .catch(super.serviceError);
  }
}