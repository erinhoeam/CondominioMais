import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from './../../shared/base.component';

import { RecebimentoInadimplente } from './../../models/recebimento-inadimplente';

import { RecebimentoService } from './../../services/recebimento.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-recebimento-inadimplentes',
  templateUrl: './recebimento-inadimplentes.component.html',
  styleUrls: ['./recebimento-inadimplentes.component.scss']
})
export class RecebimentoInadimplentesComponent extends BaseComponent {

  recebimentos:RecebimentoInadimplente[];
  total:number;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private recebimentoService:RecebimentoService) { 
    super(toastr,vcr,routerC);
    this.title = this.message.titles.RECEBIMENTO.TITLE_INADIMPLENTE;
  }

  listar(){
    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);
    this.recebimentoService.listarInadimplentes()
    .subscribe(
      response => { this.onListarComplete(response) },
      error => { this.onError(error) });
  }

  onListarComplete(entities: RecebimentoInadimplente[]) {
    this.hideToastrInfo();
    this.recebimentos = entities;
    this.total = this.recebimentos.reduce((previous, init) => init.valorRecebimento + previous ,0);
    this.hideToastrInfo();
    this.errors = [];
  }

}
