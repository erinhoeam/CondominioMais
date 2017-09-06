import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { Morador } from './../models/morador';

@Injectable()
export class MoradorService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }
  
  atualizar(entity: Morador) : Observable<Morador>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}morador`, entity, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  listar() : Observable<Morador[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}morador`, options)
                        .map((res:Response) => <Morador[]>res.json())
                        .catch(super.serviceError);
  }

  obter(id:String) : Observable<Morador>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}morador/${id}`, options)
                        .map((res:Response) => <Morador>res.json())
                        .catch(super.serviceError);
  }
}