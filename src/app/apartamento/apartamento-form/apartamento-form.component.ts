import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { Apartamento } from './../../models/apartamento';
import { Edificio } from './../../models/edificio';
import { Morador } from './../../models/morador';

import { ApartamentoService } from './../../services/apartamento.service';
import { EdificioService } from './../../services/edificio.service';
import { MoradorService } from './../../services/morador.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';

import { Subscription } from 'rxjs/Subscription';
import { SelectComponent, SelectItem } from "ng2-select";

@Component({
  selector: 'app-apartamento-form',
  templateUrl: './apartamento-form.component.html',
  styleUrls: ['./apartamento-form.component.scss']
})
export class ApartamentoFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  inscricao: Subscription;
  formulario: FormGroup;
  edificios:Edificio[];
  moradores:Morador[];
  apartamento:Apartamento;
  public itemsEdificio:Array<string>;
  public itemsMorador:Array<string>;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private apartamentoService:ApartamentoService,
              private edificioService:EdificioService,
              private moradorService:MoradorService) {
    super(toastr,vcr,routerC);

    this.validationMessages = {
        numero: {
            required: this.message.messages.APARTAMENTO.NUMERO_REQUIRED
        },
        edificioId: {
            required: this.message.messages.APARTAMENTO.EDIFICIO_REQUIRED
        },
        moradorId: {
            required: this.message.messages.APARTAMENTO.MORADOR_REQUIRED
        },
        percentual: {
          required: this.message.messages.APARTAMENTO.PERCENTUAL_REQUIRED,
          range: this.message.messages.APARTAMENTO.PERCENTUAL_RANGE

      }
    };
    this.apartamento = new Apartamento();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    let percentual = new FormControl('', [Validators.required, CustomValidators.range([1, 100])]);

    this.formulario = this.fb.group({
      numero: ['', Validators.required],
      edificioId: ['',Validators.required],
      moradorId:['',Validators.required],
      percentual: percentual
    });

    this.edificioService.listar()
    .subscribe(
      apiEdificio => {
        this.edificios = apiEdificio;
      },
      error => this.errors
    );

    this.moradorService.listar()
    .subscribe(
      apiMorador => {
        this.moradores = apiMorador;
      },
      error => this.errors
    );

    this.inscricao = this.routeActivated.params.subscribe(
      (params:any) => {
          
        if(params['id']){
          
          this.title = this.message.titles.APARTAMENTO.TITLE_UPDATE;

          this.apartamento.id = params['id'];
          
          this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

          this.apartamentoService.obter(this.apartamento.id)
          .subscribe(
              result => { this.onObterComplete(result) },
              error => { this.onError(error) }
          );
        }
        else{
          this.title = this.message.titles.APARTAMENTO.TITLE_NEW;
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

  onObterComplete(response: Apartamento) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.apartamento = response;
    
    this.formulario.patchValue({
        numero: this.apartamento.numero,
        edificioId: this.apartamento.edificioId,
        moradorId: this.apartamento.moradorId,
        percentual: this.apartamento.percentual
    });
  }

  save(){
    if (this.formIsValid(this.formulario)){
      
      this.apartamento.numero = this.formulario.get("numero").value;
      let p = Object.assign({}, this.apartamento, this.formulario.value);

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      if (this.apartamento.id){
          this.apartamentoService.atualizar(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.APARTAMENTO.LISTAR) },
          error => { this.onError(error) });
      }
      else
      {
          this.apartamentoService.novo(p)
          .subscribe(
          result => { this.onCompleteSuccess(result,
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.APARTAMENTO.LISTAR) },
          error => { this.onError(error) });
      }
    }
    else
    {
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }
}
