import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BaseComponent } from "./../../shared/base.component";

import { Recebimento } from './../../models/recebimento';
import { HomeService } from './../../services/home.service';

import { RecebimentoService } from './../../services/recebimento.service';

import { SelectComponent, SelectItem } from "ng2-select";

@Component({
  selector: 'app-recebimento-listar',
  templateUrl: './recebimento-listar.component.html',
  styleUrls: ['./recebimento-listar.component.scss']
})
export class RecebimentoListarComponent extends BaseComponent implements OnInit {
  @ViewChild('SelectMeses') selectMeses: SelectComponent;
  @ViewChild('childModal') public childModal:ModalDirective;
  
  public recebimentos:Recebimento[];
  public meses:any[];
  formulario: FormGroup;
  mes:number;
  total:number;
  recebimento:Recebimento;
  
  constructor(private recebimentoService:RecebimentoService,
              private homeService:HomeService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef,
              private fb:FormBuilder) {
              
    super(toastr,vcr,routerC);
    this.title = this.message.titles.RECEBIMENTO.TITLE_LIST;
    this.recebimento = new Recebimento();

  }

  ngOnInit() {

    let ano = new Date().getFullYear();
    this.formulario = this.fb.group({
      ano: ''
    });

    this.formulario.patchValue({
      ano: ano
    });

    this.homeService.listarMeses()
    .subscribe(
      api => {
        this.meses = api;
        this.meses.forEach(item => {
          item.mes = item.mes.toString();
          this.selectMeses.itemObjects.push(new SelectItem({ id: item.mes, text: item.nome }));
        })
      },
      error => this.errors
    );
  }

  onListarComplete(entities: Recebimento[]) {
    this.recebimentos = entities;
    this.total = this.recebimentos.reduce((previous, init) => init.valorRecebimento + previous ,0);
    this.hideToastrInfo();
    this.errors = [];
  }

  public selectedMes(value:any):void {
    this.mes = value;
  }

  listarRecebimentos(){
    if (this.mes == undefined) this.mes = new Date().getMonth() + 1;
    let ano = this.formulario.get("ano").value;

    this.recebimentoService.listar(this.mes,ano)
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
  }
  public showChildModal(id:String):void {
    this.recebimento.id = id;
    this.childModal.show();
  }
  public hideChildModal():void {
    this.childModal.hide();
  }
  public baixarRecebimento(){
    this.recebimentoService.baixar(this.recebimento)
    .subscribe(
    result => { this.onSaveComplete(result) },
    error => { this.onError(error) });
  }
  onSaveComplete(response: any) {
    this.hideChildModal();
    this.hideToastrInfo();
    this.errors = [];
    this.showToastrSuccess(this.message.messages.SHARED.MSG_SAVE_SUCCESS,'CondomínioMais',null);
    this.listarRecebimentos();
  }
}
