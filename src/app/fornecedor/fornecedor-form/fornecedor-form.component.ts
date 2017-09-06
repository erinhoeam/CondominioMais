import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { Fornecedor } from './../../models/fornecedor';

import { FornecedorService } from './../../services/fornecedor.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  inscricao: Subscription;
  success:boolean = false;
  formulario: FormGroup;
  fornecedor:Fornecedor;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private fornecedorService:FornecedorService) { 
      
      super(toastr,vcr,routerC);

      this.validationMessages = {
        nome: {
            required: this.message.messages.FORNECEDOR.NOME_REQUIRED,
            minlength: this.message.messages.FORNECEDOR.NOME_MIN_LENGTH,
            maxlength: this.message.messages.FORNECEDOR.NOME_MAX_LENGTH
        }
      };
      this.fornecedor = new Fornecedor();
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
          this.title = this.message.titles.FORNECEDOR.TITLE_UPDATE;

          this.fornecedor.id = params['id'];
          
          this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

          this.fornecedorService.obter(this.fornecedor.id)
          .subscribe(
              result => { this.onObterComplete(result) },
              error => { this.onError(error) }
          );
        }
        else{
          this.title = this.message.titles.FORNECEDOR.TITLE_NEW;
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

      let p = Object.assign({}, this.fornecedor, this.formulario.value);
      
      p.id = this.fornecedor.id;

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      if (this.fornecedor.id){
          this.fornecedorService.atualizar(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.FORNECEDOR.LISTAR) },
          error => { this.onError(error) });
      }
      else
      {
          this.fornecedorService.novo(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.FORNECEDOR.LISTAR) },
          error => { this.onError(error) });
      }

    }
    else{
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  onObterComplete(response: Fornecedor) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.fornecedor = response;
    
    this.formulario.patchValue({
       nome: this.fornecedor.nome
    });
  }
}
