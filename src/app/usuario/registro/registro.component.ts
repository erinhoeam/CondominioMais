import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { BaseComponent } from './../../shared/base.component';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { HomeService } from './../../services/home.service';

import { GenericValidator } from './../../utils/generic-form-validator';
import { StringUtils } from './../../utils/string.utils';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  usuario: Usuario;
  formulario: FormGroup;
  public maskCpfCnpj:any;
  public labelCpfCnpj:string;

  constructor(private usuarioService:UsuarioService,
              private homeService:HomeService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder) {
    
    super(toastr,vcr,routerC);
    
    this.validationMessages = {
      nome: {
          required: this.message.messages.USUARIO.NOME_REQUIRED,
          minlength: this.message.messages.USUARIO.NOME_MIN_LENGTH,
          maxlength: this.message.messages.USUARIO.NOME_MAX_LENGTH
      },
      cpfcnpj: {
          required: this.message.messages.USUARIO.CPF_CNPJ_REQUIRED,
          validCPF: this.message.messages.USUARIO.CPF_INVALID,
          validCNPJ: this.message.messages.USUARIO.CNPJ_INVALID
      },
      tipoUsuario: {
        required: this.message.messages.USUARIO.TIPO_USUARIO_REQUIRED,
      },
      pessoa: {
          required: this.message.messages.USUARIO.TIPO_PESSOA_REQUIRED,
      },
      email: {
          required: this.message.messages.USUARIO.EMAIL_REQUIRED,
          email: this.message.messages.USUARIO.EMAIL_INVALID
      },
      senha:{
          required: this.message.messages.ALTERAR_SENHA.SENHA_NOVA_REQUIRED,
          minlength: this.message.messages.ALTERAR_SENHA.SENHA_NOVA_MIN_LENGTH
      },
      confirmeSenha:{
          required: this.message.messages.ALTERAR_SENHA.SENHA_CONFIRME_REQUIRED,
          minlength: this.message.messages.ALTERAR_SENHA.SENHA_CONFIRME_MIN_LENGTH,
          equalTo: this.message.messages.ALTERAR_SENHA.SENHA_CONFIRME_EQUAL_TO
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.usuario = new Usuario();
    this.maskCpfCnpj = this.maskCpf;

  }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.formulario = this.fb.group({
      nome: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)]],
      cpfcnpj:['',Validators.required],
      pessoa:['',Validators.required],
      tipoUsuario:['',Validators.required],
      email: ['', [Validators.required,
      CustomValidators.email]], 
      senha: senha,
      confirmeSenha: senhaConfirmacao
    });
    this.formulario.patchValue({ pessoa: "F", tipoUsuario: 1 });
    this.changePessoa();
    this.title = this.message.titles.USUARIO.TITLE;
  }

  ngAfterViewInit(): void {
    this.validateOnBlur(this.formInputElements,this.formulario);
  }

  save(){

    if (this.formIsValid(this.formulario)){

      let p = Object.assign({}, this.usuario, this.formulario.value);  

      p.cpfcnpj = p.cpfcnpj.replace(/[^\d]+/g,'');

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      this.usuarioService.registrarUsuario(p)
      .subscribe(
          result => { this.onCompleteSuccess(result,
            this.message.messages.SHARED.MSG_SAVE_SUCCESS,
            this.message.routes.HOME.INICIAL) },
          error => { this.onError(error) }
      );
    }
    else{
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  changePessoa(){
    let pessoa = this.formulario.get("pessoa").value;
    if (pessoa === "F"){
      this.formulario.controls["cpfcnpj"].setValidators([Validators.required,CustomValidator.CPFValidator]);
      this.maskCpfCnpj = this.maskCpf;
      this.labelCpfCnpj = "CPF";
    }
    else{
      this.formulario.controls["cpfcnpj"].setValidators([Validators.required,CustomValidator.CNPJValidator]);
      this.maskCpfCnpj = this.maskCnpj;
      this.labelCpfCnpj = "CNPJ";
    }
  }
  generateRandomPassword(){
    this.homeService.generatePassword()
    .subscribe(
      api => {
        
        this.formulario.patchValue({
          senha: api.password,
          confirmeSenha: api.password
        });
      },
      error => this.errors
    );

  }
}