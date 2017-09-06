import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { CentroCustoRoutingModule } from './centrocusto.routing.module';
import { CentroCustoMainComponent } from './centrocusto-main/centrocusto-main.component';
import { CentroCustoFormComponent } from './centrocusto-form/centrocusto-form.component';
import { CentroCustoListarComponent } from './centrocusto-listar/centrocusto-listar.component';

import { CentroCustoService } from './../services/centrocusto.service';

@NgModule({
  imports: [
    FormsModule,SharedModule,CentroCustoRoutingModule
  ],
  exports: [CentroCustoListarComponent, CentroCustoFormComponent],
  declarations: [CentroCustoMainComponent, CentroCustoFormComponent, CentroCustoListarComponent],
  providers: [CentroCustoService]
})
export class CentroCustoModule { }
