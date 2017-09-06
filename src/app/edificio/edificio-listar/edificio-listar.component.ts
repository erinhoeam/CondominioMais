import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

import { Edificio } from './../../models/edificio';

import { EdificioService } from './../../services/edificio.service';

@Component({
  selector: 'app-edificio-listar',
  templateUrl: './edificio-listar.component.html',
  styleUrls: ['./edificio-listar.component.scss']
})
export class EdificioListarComponent extends BaseComponent implements OnInit {
  
  public edificios:Edificio[];
  
  constructor(private edificioService:EdificioService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef) {
      super(toastr,vcr,routerC);
      this.title = this.message.titles.EDIFICIO.TITLE_LIST;
  }

  ngOnInit() {

    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);
    
    this.edificioService.listar()
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
  }

  onListarComplete(entities: Edificio[]) {
    this.edificios = entities;
    
    this.hideToastrInfo();
    this.errors = [];
  }
}
