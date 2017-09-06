import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { RecebimentoRoutingModule } from './recebimento.routing.module';
import { RecebimentoMainComponent } from './recebimento-main/recebimento-main.component';
import { RecebimentoFormComponent } from './recebimento-form/recebimento-form.component';
import { RecebimentoListarComponent } from './recebimento-listar/recebimento-listar.component';
import { RecebimentoBoletoComponent } from './recebimento-boleto/recebimento-boleto.component';
import { RecebimentosBoletosComponent } from './recebimentos-boletos/recebimentos-boletos.component';

import { RecebimentoService } from './../services/recebimento.service';
import { CentroCustoService } from './../services/centrocusto.service';
import { ApartamentoService } from './../services/apartamento.service';
import { ClienteService } from './../services/cliente.service';
import { HomeService } from './../services/home.service';

@NgModule({
  imports: [
    FormsModule,SharedModule,RecebimentoRoutingModule
  ],
  exports: [RecebimentoListarComponent, RecebimentoFormComponent, RecebimentoBoletoComponent],
  declarations: [RecebimentoMainComponent, RecebimentoFormComponent, RecebimentoListarComponent, RecebimentoBoletoComponent, RecebimentosBoletosComponent],
  providers: [RecebimentoService, HomeService, ApartamentoService,CentroCustoService,ClienteService]
})
export class RecebimentoModule { }
