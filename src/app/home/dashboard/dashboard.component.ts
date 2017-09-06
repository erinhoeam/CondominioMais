import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from './../../shared/base.component';
import { HomeService } from './../../services/home.service';
import { DespesaService } from './../../services/despesa.service';
import { RecebimentoService } from './../../services/recebimento.service';

import { BarChart } from './../../models/barChart';
import { ChartData } from './../../models/chartData';
import { BalancoEdificio } from './../../models/balanco-edificio';
import { Despesa } from './../../models/despesa';
import { RecebimentoBoletoUsuario } from './../../models/recebimento-boletos-usuarios';
import { ApartamentoBoleto } from './../../models/apartamento-boleto';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { SelectComponent, SelectItem } from 'ng2-select';

@Component({
  selector: 'dashboard-chart',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent {
  @ViewChild('SelectMeses') selectMeses: SelectComponent;
  
  options:Object;
  public despesas:Despesa[];
  public boletos:ApartamentoBoleto[];
  public balanco:BalancoEdificio;
  public meses:any[];
  formulario: FormGroup;
  mes:number;
  total:Number;
  constructor(private homeService:HomeService,
              private despesaService:DespesaService,
              private recebimentoService:RecebimentoService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder) {

    super(toastr,vcr,routerC);

    this.homeService.dashboardChart().subscribe(
      response => { this.onDashboardChartComplete(response); },
      error => { this.onError(error); }
    );

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
    this.listarDespesas();
    this.listarBoletosusuario();
    this.listarBalancoEdificio();
  }

  private onDashboardChartComplete(response:BarChart){
    this.options = {
      title : { text : 'Recebimentos X Despesas' },
      chart: {
        type: 'column',
        width: 920,
      },
      colors: ['#7cb5ec', '#ea2a2a', '#90ed7d', '#f7a35c', '#8085e9', 
      '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
      xAxis: {
        categories: response.labels,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Valores R$'
        }
      },
      series: [{
        name:response.datas[0].label,
        data: response.datas[0].data
      },
      {
        name:response.datas[1].label,
        data: response.datas[1].data
      }]
    };
  }

  listarDespesas(){
    if (this.mes == undefined) this.mes = new Date().getMonth() + 1;
    let ano = this.formulario.get("ano").value;

    this.despesaService.listar(this.mes,ano)
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
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

  listarBoletosusuario(){
        this.recebimentoService.listarBoletosUsuario()
          .subscribe(
            response => { this.onListarBoletosComplete(response) },
            error => { this.onError(error) });
  }
  onListarBoletosComplete(entities: ApartamentoBoleto[]) {
    this.boletos = entities;
    this.errors = [];
  }
  onListarBalancoEdificioComplete(entities: BalancoEdificio) {
    this.balanco = entities;
    this.errors = [];
  }
  listarBalancoEdificio(){

    this.homeService.balanco()
      .subscribe(
        response => { this.onListarBalancoEdificioComplete(response) },
        error => { this.onError(error) });
  }
}
