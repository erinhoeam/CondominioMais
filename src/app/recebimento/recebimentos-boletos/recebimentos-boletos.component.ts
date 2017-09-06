import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, AfterViewInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { RecebimentoBoletos } from './../../models/recebimento-boletos';
import { CentroCusto } from './../../models/centrocusto';

import { RecebimentoService } from './../../services/recebimento.service';
import { ApartamentoService } from './../../services/apartamento.service';
import { ClienteService } from './../../services/cliente.service';
import { CentroCustoService } from './../../services/centrocusto.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';

@Component({
  selector: 'app-recebimentos-boletos',
  templateUrl: './recebimentos-boletos.component.html',
  styleUrls: ['./recebimentos-boletos.component.scss']
})
export class RecebimentosBoletosComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  recebimento:RecebimentoBoletos;
  centroscusto:CentroCusto[];
  formulario: FormGroup;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder,
              private recebimentoService:RecebimentoService,
              private centroCustoService:CentroCustoService) { 
      super(toastr,vcr,routerC);

      this.validationMessages = {
        centroCustoId: {
          required: this.message.messages.RECEBIMENTO.CENTRO_CUSTO_REQUIRED
        },
        valorRecebimento: {
            required: this.message.messages.RECEBIMENTO.VALOR_RECEBIMENTO_REQUIRED
        },
        valorTaxaExtra: {
          required: this.message.messages.RECEBIMENTO.VALOR_TAXA_EXTRA_INVALID
      }           
      };
      this.title = this.message.messages.RECEBIMENTO.GERAR_BOLETOS_AP;
      this.recebimento = new RecebimentoBoletos();
      this.genericValidator = new GenericValidator(this.validationMessages);
  
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      centroCustoId: ['',Validators.required],
      valorRecebimento:['',Validators.required],
      valorTaxaExtra:['',Validators.required]
    });

    this.centroCustoService.listar()
    .subscribe(
      api => {
        this.centroscusto = api;
      },
      error => {this.onError(error)}
    );

  }

  ngAfterViewInit(): void {
    this.validateOnBlur(this.formInputElements,this.formulario);
  }

  save(){
    if (this.formIsValid(this.formulario)){
      let p = Object.assign({}, this.recebimento, this.formulario.value);
      
      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);
      
      this.recebimentoService.boletos(p)
      .subscribe(
      result => { this.onCompleteSuccess(result, 
        this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
        this.message.routes.RECEBIMENTO.LISTAR) },
      error => { this.onError(error) });
    }
    else
    {
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }
}
