import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";

import { Log } from './../models/log';
import { LogConsulta } from './../models/logCconsulta';

@Injectable()
export class LoggingService extends ServiceBase {

  constructor(private http: Http) { 
    super();
  }

  listar(entity:LogConsulta) : Observable<Log[]>{
        let options = this.obterAuthHeader();
        entity.id = entity.id == "" ? "00000000-0000-0000-0000-000000000000" : entity.id;
        
        return this.http.post(`${this.UrlServiceV1}logging`, entity, options)
                        .map((res:Response) => <Log[]>res.json())
                        .catch(super.serviceError);
  }
  obter(id:String) : Observable<Log>{
    
    let options = this.obterAuthHeader();

    return this.http.get(`${this.UrlServiceV1}logging/${id}`, options)
                    .map((res:Response) => <Log>res.json())
                    .catch(super.serviceError);
}  
}