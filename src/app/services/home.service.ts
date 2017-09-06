import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Headers, Http } from "@angular/http";

import { ServiceBase } from "app/services/service.base";

import { BarChart } from './../models/barChart';
import { BalancoEdificio } from './../models/balanco-edificio';

@Injectable()
export class HomeService extends ServiceBase {

    constructor(private http: Http) {
        super();
     }

     listarMeses(){
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

        let response = this.http
            .get(this.UrlServiceV1 + "listar-meses", options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
     }

     generatePassword(){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

       let response = this.http
           .get(this.UrlServiceV1 + "generate-password", options)
           .map(super.extractData)
           .catch(super.serviceError);

       return response;
    }

     dashboardChart() : Observable<BarChart>{
        let options = this.obterAuthHeader();

        let response = this.http
            .get(`${this.UrlServiceV1}chart-bar`, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
    }
    balanco() : Observable<BalancoEdificio>{
        let options = this.obterAuthHeader();

        let response = this.http
            .get(`${this.UrlServiceV1}balanco`, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
    }
}