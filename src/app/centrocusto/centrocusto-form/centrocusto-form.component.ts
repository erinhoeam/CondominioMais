import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { CentroCusto } from './../../models/centrocusto';

import { CentroCustoService } from './../../services/centrocusto.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-centrocusto-form',
  templateUrl: './centrocusto-form.component.html',
  styleUrls: ['./centrocusto-form.component.scss']
})
export class CentroCustoFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  inscricao: Subscription;
  formulario: FormGroup;
  centrocusto:CentroCusto;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private centroCustoService:CentroCustoService) { 
      
      super(toastr,vcr,routerC);

      this.validationMessages = {
        nome: {
            required: this.message.messages.CENTRO_CUSTO.NOME_REQUIRED,
            minlength: this.message.messages.CENTRO_CUSTO.NOME_MIN_LENGTH,
            maxlength: this.message.messages.CENTRO_CUSTO.NOME_MAX_LENGTH
        }
      };
      this.centrocusto = new CentroCusto();
      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.formulario = this.fb.group({
      nome: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)]]
    });

    this.inscricao = this.routeActivated.params.subscribe(
    (params:any) => {
          
        if(params['id']){

          this.title = this.message.titles.CENTRO_CUSTO.TITLE_UPDATE;

          this.centrocusto.id = params['id'];
          
          this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

          this.centroCustoService.obter(this.centrocusto.id)
          .subscribe(
              result => { this.onObterComplete(result) },
              error => { this.onError(error) }
          );
        }
        else{
          this.title = this.message.titles.CENTRO_CUSTO.TITLE_NEW;
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

      let p = Object.assign({}, this.centrocusto, this.formulario.value);
      p.id = this.centrocusto.id;

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      if (this.centrocusto.id){
          this.centroCustoService.atualizar(p)
          .subscribe(
          result => { this.onCompleteSuccess(result,
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.CENTRO_CUSTO.LISTAR)
          },
          error => { this.onError(error) });
      }
      else
      {
          this.centroCustoService.novo(p)
          .subscribe(
          result => { this.onCompleteSuccess(result,
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.CENTRO_CUSTO.LISTAR) },
          error => { this.onError(error) });
      }

    }
    else{
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  onObterComplete(response: CentroCusto) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.centrocusto = response;
    
    this.formulario.patchValue({
       nome: this.centrocusto.nome
    });
  }
}
