import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { DespesaRoutingModule } from './despesa.routing.module';
import { DespesaMainComponent } from './despesa-main/despesa-main.component';
import { DespesaFormComponent } from './despesa-form/despesa-form.component';
import { DespesaListarComponent } from './despesa-listar/despesa-listar.component';

import { DespesaService } from './../services/despesa.service';
import { CentroCustoService } from './../services/centrocusto.service';
import { FornecedorService } from './../services/fornecedor.service';
import { HomeService } from './../services/home.service';

@NgModule({
  imports: [
    FormsModule,SharedModule,DespesaRoutingModule
  ],
  exports: [DespesaListarComponent, DespesaFormComponent],
  declarations: [DespesaMainComponent, DespesaFormComponent, DespesaListarComponent],
  providers: [DespesaService, HomeService, FornecedorService,CentroCustoService]
})
export class DespesaModule { }
