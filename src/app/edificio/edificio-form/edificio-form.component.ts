import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { Edificio } from './../../models/edificio';

import { EdificioService } from './../../services/edificio.service';
import { EnderecoService } from './../../services/endereco.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edificio-form',
  templateUrl: './edificio-form.component.html',
  styleUrls: ['./edificio-form.component.scss']
})
export class EdificioFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    inscricao: Subscription;
    formulario: FormGroup;
    edificio:Edificio;
    estados:any[];

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private edificioService:EdificioService,
              private enderecoService:EnderecoService) { 
      
      super(toastr,vcr,routerC);
      
      this.listarUf();

      this.validationMessages = {
        nome: {
            required: this.message.messages.EDIFICIO.NOME_REQUIRED,
            minlength: this.message.messages.EDIFICIO.NOME_MIN_LENGTH,
            maxlength: this.message.messages.EDIFICIO.NOME_MAX_LENGTH
        },
        cnpj: {
            required: this.message.messages.EDIFICIO.CNPJ_REQUIRED,
            minlength: this.message.messages.EDIFICIO.CNPJ_MIN_LENGTH,
            maxlength: this.message.messages.EDIFICIO.CNPJ_MAX_LENGTH,
            validCNPJ: this.message.messages.EDIFICIO.CNPJ_INVALID
        },
        logradouro: {
          required: this.message.messages.EDIFICIO.LOGRADOURO_REQUIRED,
          minlength: this.message.messages.EDIFICIO.LOGRADOURO_MIN_LENGTH,
          maxlength: this.message.messages.EDIFICIO.LOGRADOURO_MAX_LENGTH
        },
        numero: {
          required: this.message.messages.EDIFICIO.NUMERO_REQUIRED,
          minlength: this.message.messages.EDIFICIO.NUMERO_MIN_LENGTH,
          maxlength: this.message.messages.EDIFICIO.NUMERO_MAX_LENGTH
        },
        bairro: {
          required: this.message.messages.EDIFICIO.BAIRRO_REQUIRED,
          minlength: this.message.messages.EDIFICIO.BAIRRO_MIN_LENGTH,
          maxlength: this.message.messages.EDIFICIO.BAIRRO_MAX_LENGTH
        },
        cidade: {
          required: this.message.messages.EDIFICIO.CIDADE_REQUIRED,
          minlength: this.message.messages.EDIFICIO.CIDADE_MIN_LENGTH,
          maxlength: this.message.messages.EDIFICIO.CIDADE_MAX_LENGTH
        },
        cep: {
          required: this.message.messages.EDIFICIO.CEP_REQUIRED,
          minlength: this.message.messages.EDIFICIO.CEP_MIN_LENGTH,
          maxlength: this.message.messages.EDIFICIO.CEP_MAX_LENGTH
        },
        uf: {
          required: this.message.messages.EDIFICIO.UF_REQUIRED 
        }
      };
      this.edificio = new Edificio();
      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

        this.formulario = this.fb.group({
          nome: ['', [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150)]],
          cnpj: ['', [Validators.required,
          CustomValidator.CNPJValidator]],
          endereco: this.fb.group({
            logradouro: [null, [Validators.required,
              Validators.minLength(2),
              Validators.maxLength(150)]],
            complemento: '',
            numero: [null, [Validators.required,
              Validators.minLength(2),
              Validators.maxLength(20)]],
            bairro: [null, [Validators.required,
              Validators.minLength(2),
              Validators.maxLength(100)]],
            cidade: [null, [Validators.required,
              Validators.minLength(2),
              Validators.maxLength(100)]],
            uf: [null, [Validators.required]],
            cep: [null, [Validators.required,
            ]]
          })
        });

        this.inscricao = this.routeActivated.params.subscribe(
        (params:any) => {
            
            if(params['id']){

              this.title = this.message.titles.EDIFICIO.TITLE_UPDATE;

              this.edificio.id = params['id'];
              
              this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

              this.edificioService.obter(this.edificio.id)
              .subscribe(
                  result => { this.onObterComplete(result) },
                  error => { this.onError(error) }
              );
            }
            else{
              this.title = this.message.titles.EDIFICIO.TITLE_NEW;
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

      let p = Object.assign({}, this.edificio, this.formulario.value);

      p.id = this.edificio.id;

      p.cnpj = p.cnpj.replace(/[^\d]+/g,'');
      p.endereco.cep = p.endereco.cep.replace(/\D/g, '');

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      if (this.edificio.id){

          p.endereco.id = this.edificio.endereco.id;
          p.endereco.edificioId = this.edificio.endereco.edificioId;
          
          this.edificioService.atualizar(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.EDIFICIO.LISTAR) },
          error => { this.onError(error) });
      }
      else
      {
          this.edificioService.novo(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.EDIFICIO.LISTAR) },
          error => { this.onError(error) });
      }

    }
    else{
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  onObterComplete(response: Edificio) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.edificio = response;
    
    this.formulario.patchValue({
       nome: this.edificio.nome,
       cnpj: this.edificio.cnpj
    });
    this.formulario.patchValue({
      endereco: {
        logradouro: this.edificio.endereco.logradouro,
        complemento: this.edificio.endereco.complemento,
        numero: this.edificio.endereco.numero,
        bairro: this.edificio.endereco.bairro,
        cidade: this.edificio.endereco.cidade,
        uf: this.edificio.endereco.uf,
        cep: this.edificio.endereco.cep
      }
    });
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;
    
    //Verifica se campo cep possui valor informado.
    if (cep) {
      //Nova variável "cep" somente com dígitos.
      cep = cep.replace(/\D/g, '');
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/
      if (validacep.test(cep)) {
        this.enderecoService.consultarCep(cep)
        .subscribe(dados => this.populaDadosForm(dados));
      }
    }
  }

  populaDadosForm(dados) {
    
    this.formulario.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf
      }
    });
  }
  listarUf(){
      this.enderecoService.listarUf()
      .subscribe(
          result => { this.onCompleteListarUf(result) },
          error => { this.onError(error) }
      );
  }

  onCompleteListarUf(response: any) {
    this.estados = response;
    this.errors = [];
  }
}
