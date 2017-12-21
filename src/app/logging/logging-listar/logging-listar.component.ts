import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

import { Log } from './../../models/log';
import { LogConsulta } from './../../models/logCconsulta';

import { LoggingService } from './../../services/logging.service';

import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { DateUtils } from './../../utils/date-utils';

@Component({
  selector: 'app-logging-listar',
  templateUrl: './logging-listar.component.html',
  styleUrls: ['./logging-listar.component.scss']
})
export class LoggingListarComponent extends BaseComponent implements OnInit {

  logs:Log[];
  myDatePickerOptions = DateUtils.getMyDatePickerOptions(false);
  formulario: FormGroup;
  logConsulta:LogConsulta;

  constructor(public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef,
              private fb:FormBuilder,
              private loggingService:LoggingService) { 
      super(toastr,vcr,routerC);
      this.title = this.message.titles.LOG.TITLE;
    }

  ngOnInit() {
    this.formulario = this.fb.group({
      id:'',
      dataFinal: '',
      dataInicial:'',
    });

    this.formulario.patchValue({
      dataInicial: { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } },
      dataFinal: { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } },
    });
    this.logConsulta = new LogConsulta();
  }

  listarLogs(){
    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);

    let p = Object.assign({}, this.logConsulta, this.formulario.value);

    p.dataInicial = DateUtils.getMyDatePickerDate(p.dataInicial);
    p.dataFinal = DateUtils.getMyDatePickerDate(p.dataFinal);

    this.loggingService.listar(p)
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
  }
  onListarComplete(entities: Log[]) {
    this.logs = entities;
    
    this.hideToastrInfo();
    this.errors = [];
  }
}
