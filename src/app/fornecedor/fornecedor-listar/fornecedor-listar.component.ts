import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

import { Fornecedor } from './../../models/fornecedor';

import { FornecedorService } from './../../services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-listar',
  templateUrl: './fornecedor-listar.component.html',
  styleUrls: ['./fornecedor-listar.component.scss']
})
export class FornecedorListarComponent extends BaseComponent implements OnInit {

  public fornecedores:Fornecedor[];

  constructor(private fornecedorService:FornecedorService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef) {
      super(toastr,vcr,routerC);
      this.title = this.message.titles.FORNECEDOR.TITLE_LIST;
  }

  ngOnInit() {
    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);
    this.fornecedorService.listar()
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
  }

  onListarComplete(entities: Fornecedor[]) {
    this.fornecedores = entities;
    
    this.hideToastrInfo();
    this.errors = [];
  }
}
