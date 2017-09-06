import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

import { Recebimento } from './../../models/recebimento';

import { RecebimentoService } from './../../services/recebimento.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recebimento-boleto',
  templateUrl: './recebimento-boleto.component.html',
  styleUrls: ['./recebimento-boleto.component.scss']
})
export class RecebimentoBoletoComponent extends BaseComponent implements OnDestroy {
  
  recebimento:Recebimento;
  inscricao: Subscription;
  today:Date = new Date();
  
  constructor(private recebimentoService:RecebimentoService,
              public toastr: ToastsManager, 
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              vcr: ViewContainerRef) {
              
              super(toastr,vcr,routerC);
              
    this.inscricao = this.routeActivated.params.subscribe(
      (params:any) => {

        if(params['id']){

          let id:string = params['id'];
          
          this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);
          this.obterBoleto(id);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  onObterComplete(entity: Recebimento) {
    this.hideToastrInfo();
    this.recebimento = entity;
    this.errors = [];
  }

  obterBoleto(id:string){
    this.recebimentoService.boleto(id)
      .subscribe(
        response => { this.onObterComplete(response) },
        error => { this.onError(error) });
  }
}
