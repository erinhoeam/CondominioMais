import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";
import { ModalDirective } from 'ngx-bootstrap/modal';

import { Despesa } from './../../models/despesa';
import { HomeService } from './../../services/home.service';

import { DespesaService } from './../../services/despesa.service';

import { SelectComponent, SelectItem } from "ng2-select";

@Component({
  selector: 'app-despesa-listar',
  templateUrl: './despesa-listar.component.html',
  styleUrls: ['./despesa-listar.component.scss']
})
export class DespesaListarComponent extends BaseComponent implements OnInit {
  @ViewChild('SelectMeses') selectMeses: SelectComponent;
  @ViewChild('childModal') public childModal:ModalDirective;

  despesas:Despesa[];
  despesa:Despesa;
  itensMeses:any[];
  formulario: FormGroup;
  mes:number;
  total:Number;

  constructor(private despesaService:DespesaService,
              private homeService:HomeService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef,
              private fb:FormBuilder) {
      super(toastr,vcr,routerC);
      this.title = this.message.titles.DESPESA.TITLE_LIST;
      this.despesa = new Despesa();
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
        api.forEach(item => {
          item.mes = item.mes.toString();
          this.selectMeses.itemObjects.push(new SelectItem({ id: item.mes, text: item.nome }));
        })
      },
      error => this.errors
    );
  }

  onListarComplete(entities: Despesa[]) {
    this.despesas = entities;
    this.total = this.despesas.reduce((previous, init) => init.valorDespesa + previous ,0);
    this.hideToastrInfo();
    this.errors = [];
  }

  public selectedMes(value:any):void {
    this.mes = value;
  }

  listarDespesas(){
    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);
    if (this.mes == undefined) this.mes = new Date().getMonth() + 1;
    let ano = this.formulario.get("ano").value;

    this.despesaService.listar(this.mes,ano)
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
  }
  public showChildModal(id:String):void {
    this.despesa.id = id;
    this.childModal.show();
  }
  public hideChildModal():void {
    this.childModal.hide();
  }
  public baixarDespesa(){
    this.despesaService.baixar(this.despesa)
    .subscribe(
    result => { this.onSaveComplete(result) },
    error => { this.onError(error) });
  }
  onSaveComplete(response: any) {
    this.hideChildModal();
    this.hideToastrInfo();
    this.errors = [];
    this.showToastrSuccess(this.message.messages.SHARED.MSG_SAVE_SUCCESS,this.message.titles.SISTEMA.TITLE,null);
    this.listarDespesas();
  }
}
