import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

import { CentroCusto } from './../../models/centrocusto';

import { CentroCustoService } from './../../services/centrocusto.service';

@Component({
  selector: 'app-centrocusto-listar',
  templateUrl: './centrocusto-listar.component.html',
  styleUrls: ['./centrocusto-listar.component.scss']
})
export class CentroCustoListarComponent extends BaseComponent implements OnInit {

  public centrocustos:CentroCusto[];

  constructor(private centrocustoService:CentroCustoService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef) {
      super(toastr,vcr,routerC);
      this.title = this.message.titles.CENTRO_CUSTO.TITLE_LIST;
  }

  ngOnInit() {
    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);
    this.centrocustoService.listar()
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
  }

  onListarComplete(entities: CentroCusto[]) {
    this.centrocustos = entities;
    
    this.hideToastrInfo();
    this.errors = [];
  }
}
