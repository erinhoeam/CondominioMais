import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { Recebimento } from './../../models/recebimento';
import { Apartamento } from './../../models/apartamento';
import { Cliente } from './../../models/cliente';
import { CentroCusto } from './../../models/centrocusto';

import { RecebimentoService } from './../../services/recebimento.service';
import { ApartamentoService } from './../../services/apartamento.service';
import { ClienteService } from './../../services/cliente.service';
import { CentroCustoService } from './../../services/centrocusto.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { DateUtils } from './../../utils/date-utils';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recebimento-form',
  templateUrl: './recebimento-form.component.html',
  styleUrls: ['./recebimento-form.component.scss']
})
export class RecebimentoFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  recebimento:Recebimento;
  apartamentos:Apartamento[];
  clientes:Cliente[];
  centroscusto:CentroCusto[];
  inscricao: Subscription;
  formulario: FormGroup;
  myDatePickerOptions = DateUtils.getMyDatePickerOptions(true);
  tipoReceb:number;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private recebimentoService:RecebimentoService,
              private apartamentoService:ApartamentoService,
              private clienteService:ClienteService,
              private centroCustoService:CentroCustoService) {
    
    super(toastr,vcr,routerC);

    this.validationMessages = {
        tipoRecebimento: {
            required: this.message.messages.RECEBIMENTO.TIPO_RECEBIMENTO_REQUIRED
        },
        centroCustoId: {
          required: this.message.messages.RECEBIMENTO.CENTRO_CUSTO_REQUIRED
        },
        dataVencimento: {
            required: this.message.messages.RECEBIMENTO.DATA_VENCIMENTO_REQUIRED
        },
        valorRecebimento: {
            required: this.message.messages.RECEBIMENTO.VALOR_RECEBIMENTO_REQUIRED
        }           
    };
    this.recebimento = new Recebimento();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      tipoRecebimento: ['', Validators.required],
      apartamentoId: '',
      clienteId: '',
      centroCustoId: ['',Validators.required],
      dataVencimento:['',Validators.required],
      valorRecebimento:['',Validators.required],
    });
    this.formulario.patchValue({
      tipoRecebimento: 1
    });
    this.tipoReceb = 1;
    this.apartamentoService.listarApi()
    .subscribe(
      api => {
        this.apartamentos = api;
      },
      error => {this.onError(error)}
    );

    this.clienteService.listar()
    .subscribe(
      api => {
        this.clientes = api;
      },
      error => {this.onError(error)}
    );

    this.centroCustoService.listar()
    .subscribe(
      api => {
        this.centroscusto = api;
      },
      error => {this.onError(error)}
    );

    this.inscricao = this.routeActivated.params.subscribe(
      (params:any) => {
          
        if(params['id']){
          this.title = this.message.messages.RECEBIMENTO.TITLE_UPDATE;

          this.recebimento.id = params['id'];
          
          this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

          this.recebimentoService.obter(this.recebimento.id)
          .subscribe(
              result => { this.onObterComplete(result) },
              error => { this.onError(error) }
          );
        }
        else{
          this.title = this.message.messages.RECEBIMENTO.TITLE_NEW;
        }
      }
    ); 
  }

  ngAfterViewInit(): void {
    this.validateOnBlur(this.formInputElements,this.formulario);
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  save(){
    if (this.formIsValid(this.formulario)){
      let p = Object.assign({}, this.recebimento, this.formulario.value);
      p.dataVencimento = DateUtils.getMyDatePickerDate(p.dataVencimento);

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);
      if (this.recebimento.id){
        
          this.recebimentoService.atualizar(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.RECEBIMENTO.LISTAR) },
          error => { this.onError(error) });
      }
      else
      {
          this.recebimentoService.novo(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.RECEBIMENTO.LISTAR) },
          error => { this.onError(error) });
      }
    }
    else
    {
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  onObterComplete(response: Recebimento) {
    
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.recebimento = response;
    let dataVencimento = new Date(this.recebimento.dataVencimento);
    
    this.formulario.patchValue({
      tipoRecebimento: this.recebimento.tipoRecebimento,
      apartamentoId: this.recebimento.apartamentoId,
      clienteId: this.recebimento.clienteId,
      centroCustoId: this.recebimento.centroCustoId,
      dataVencimento: { date: {
                          year: dataVencimento.getFullYear(),
                          month: dataVencimento.getMonth()+1,
                          day: dataVencimento.getDate() 
                        }
                      },
      valorRecebimento: this.recebimento.valorRecebimento
    });
  }
  setRecebimento(){
    this.tipoReceb = this.formulario.get("tipoRecebimento").value;
  }  
}
