import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { Despesa } from './../../models/despesa';
import { Fornecedor } from './../../models/fornecedor';
import { CentroCusto } from './../../models/centrocusto';

import { DespesaService } from './../../services/despesa.service';
import { FornecedorService } from './../../services/fornecedor.service';
import { CentroCustoService } from './../../services/centrocusto.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { DateUtils } from './../../utils/date-utils';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.scss']
})
export class DespesaFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  despesa:Despesa;
  fornecedores:Fornecedor[];
  centroscusto:CentroCusto[];
  inscricao: Subscription;
  success:boolean = false;
  formulario: FormGroup;
  myDatePickerOptions = DateUtils.getMyDatePickerOptions(false);
  showQuantidade:boolean;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private despesaService:DespesaService,
              private fornecedorService:FornecedorService,
              private centroCustoService:CentroCustoService) {
    super(toastr,vcr,routerC);

    this.validationMessages = {
        fornecedorId: {
            required: this.message.messages.DESPESA.FORNECEDOR_REQUIRED
        },
        centroCustoId: {
            required: this.message.messages.DESPESA.CENTRO_CUSTO_REQUIRED
        },
        dataVencimento: {
            required: this.message.messages.DESPESA.DATA_VENCIMENTO_REQUIRED
        },
        valorDespesa: {
            required: this.message.messages.DESPESA.VALOR_DESPESA
        },
        quantidade:{
          required: this.message.messages.DESPESA.QUANTIDADE,
          range: this.message.messages.DESPESA.QUANTIDADE
        }          
    };
    this.despesa = new Despesa();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      fornecedorId: ['', Validators.required],
      centroCustoId: ['',Validators.required],
      dataVencimento:['',Validators.required],
      valorDespesa:['',Validators.required],
      repetir: false,
      quantidade: 0
    });

    this.fornecedorService.listar()
    .subscribe(
      api => {
        this.fornecedores = api;
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
          this.title = this.message.titles.DESPESA.TITLE_UPDATE;

          this.despesa.id = params['id'];
          
          this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

          this.despesaService.obter(this.despesa.id)
          .subscribe(
              result => { this.onObterComplete(result) },
              error => { this.onError(error) }
          );
        }
        else{
          this.title = this.message.titles.DESPESA.TITLE_NEW;
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
      let p = Object.assign({}, this.despesa, this.formulario.value);
      p.dataVencimento = DateUtils.getMyDatePickerDate(p.dataVencimento);

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      if (this.despesa.id){
          this.despesaService.atualizar(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.DESPESA.LISTAR) },
          error => { this.onError(error) });
      }
      else
      {
          this.despesaService.novo(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.DESPESA.LISTAR) },
          error => { this.onError(error) });
      }
    }
    else
    {
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  onObterComplete(response: Despesa) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.despesa = response;
    let dataVencimento = new Date(this.despesa.dataVencimento);
    
    this.formulario.patchValue({
        fornecedorId: this.despesa.fornecedorId,
        centroCustoId: this.despesa.centroCustoId,
        dataVencimento: { date: {
                            year: dataVencimento.getFullYear(),
                            month: dataVencimento.getMonth()+1,
                            day: dataVencimento.getDate() 
                          }
                        },
        valorDespesa: this.despesa.valorDespesa
    });
  }
  exibirQuantidade(){
    this.showQuantidade=!this.showQuantidade;
    if (this.showQuantidade){
      this.formulario.controls["quantidade"].setValidators([Validators.required,CustomValidators.range([1, 300])]);
    }
    else{
      this.formulario.controls["quantidade"].setValidators([]);
    }
  }    
}
