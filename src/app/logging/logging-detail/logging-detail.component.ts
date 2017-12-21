import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

import { Log } from './../../models/log';

import { LoggingService } from './../../services/logging.service';

import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { DateUtils } from './../../utils/date-utils';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-logging-detail',
  templateUrl: './logging-detail.component.html',
  styleUrls: ['./logging-detail.component.scss']
})
export class LoggingDetailComponent extends BaseComponent implements OnInit, OnDestroy {

  log:Log;
  inscricao: Subscription;
  constructor(public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef,
              private fb:FormBuilder,
              private loggingService:LoggingService,
              private routeActivated: ActivatedRoute) { 
    super(toastr,vcr,routerC);
    this.log = new Log();
  }

  ngOnInit() {
    this.inscricao = this.routeActivated.params.subscribe(
      (params:any) => {
          
        if(params['id']){
          
          this.title = this.message.titles.LOG.TITLE;

          this.log.id = params['id'];
          
          this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

          this.loggingService.obter(this.log.id)
          .subscribe(
              result => { this.onObterComplete(result) },
              error => { this.onError(error) }
          );
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  onObterComplete(response: Log) {
    console.log(response);
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.log = response;
  }
}
