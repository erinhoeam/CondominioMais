import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

import { Apartamento } from './../../models/apartamento';
import { Edificio } from './../../models/edificio';

import { ApartamentoService } from './../../services/apartamento.service';
import { EdificioService } from './../../services/edificio.service';

import { SelectComponent, SelectItem } from "ng2-select";

@Component({
  selector: 'app-apartamento-listar',
  templateUrl: './apartamento-listar.component.html',
  styleUrls: ['./apartamento-listar.component.scss']
})
export class ApartamentoListarComponent extends BaseComponent implements OnInit {
  @ViewChild('SelectEdificio') selectEdificio: SelectComponent

  public apartamentos:any[];
  edificioId:String;
  public itemsEdificio:Array<string>;
  edificios:Edificio[];

  constructor(private apartamentoService:ApartamentoService,
              private edificioService:EdificioService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef) {
      super(toastr,vcr,routerC);
      this.title = this.message.titles.APARTAMENTO.TITLE_LIST;
  }

  ngOnInit() {
    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);

    this.listarApartamentos();
    
    this.edificioService.listar()
    .subscribe(
      apiEdificio => {
        this.edificios = apiEdificio;
        this.edificios.forEach(item => {
          item.id = item.id.toString();
          this.selectEdificio.itemObjects.push(new SelectItem({ id: item.id, text: item.nome }));
        })
      },
      error => { this.onError(error) }
    );
  }

  onListarComplete(entities: Apartamento[]) {
    this.apartamentos = entities;
    
    this.hideToastrInfo();
    this.errors = [];
  }

  public selectedEdificio(value:any):void {
    this.edificioId = value;
  }

  listarApartamentos(){
    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);
    if (!this.edificioId){
      this.edificioId = "00000000-0000-0000-0000-000000000000";
    }
    this.apartamentoService.listar(this.edificioId)
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
  }
}
