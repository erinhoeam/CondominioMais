import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { Cliente } from './../../models/cliente';

import { ClienteService } from './../../services/cliente.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  inscricao: Subscription;
  formulario: FormGroup;
  cliente:Cliente;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private clienteService:ClienteService) { 
      
      super(toastr,vcr,routerC);

      this.validationMessages = {
        nome: {
          required: this.message.messages.CLIENTE.NOME_REQUIRED,
          minlength: this.message.messages.CLIENTE.NOME_MIN_LENGTH,
          maxlength: this.message.messages.CLIENTE.NOME_MAX_LENGTH
        }
      };
      this.cliente = new Cliente();
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
          this.title = this.message.titles.CLIENTE.TITLE_UPDATE;

          this.cliente.id = params['id'];
          
          this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

          this.clienteService.obter(this.cliente.id)
          .subscribe(
              result => { this.onObterComplete(result) },
              error => { this.onError(error) }
          );
        }
        else{
          this.title = this.message.titles.CLIENTE.TITLE_UPDATE;
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

      let p = Object.assign({}, this.cliente, this.formulario.value);
      p.id = this.cliente.id;

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      if (this.cliente.id){
          this.clienteService.atualizar(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.CLIENTE.LISTAR) },
          error => { this.onError(error) });
      }
      else
      {
          this.clienteService.novo(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.CLIENTE.LISTAR) },
          error => { this.onError(error) });
      }

    }
    else{
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  onObterComplete(response: Cliente) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.cliente = response;
    
    this.formulario.patchValue({
       nome: this.cliente.nome
    });
  }
}
