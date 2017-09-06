import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

import { Cliente } from './../../models/cliente';

import { ClienteService } from './../../services/cliente.service';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent extends BaseComponent implements OnInit {

  public clientes:Cliente[];

  constructor(private clienteService:ClienteService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef) {
      super(toastr,vcr,routerC);
      this.title = this.message.titles.CLIENTE.TITLE_LIST;
  }

  ngOnInit() {

    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);

    this.clienteService.listar()
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
  }

  onListarComplete(entities: Cliente[]) {
    this.clientes = entities;
    
    this.hideToastrInfo();
    this.errors = [];
  }
}
