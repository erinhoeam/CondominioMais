import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ApartamentoRoutingModule } from './apartamento.routing.module';
import { ApartamentoMainComponent } from './apartamento-main/apartamento-main.component';
import { ApartamentoListarComponent } from './apartamento-listar/apartamento-listar.component';
import { ApartamentoFormComponent } from './apartamento-form/apartamento-form.component';

import { ApartamentoService } from './../services/apartamento.service';
import { MoradorService } from './../services/morador.service';
import { EdificioService } from './../services/edificio.service';

@NgModule({
  imports: [
    FormsModule,SharedModule,ApartamentoRoutingModule
  ],
  exports: [ApartamentoListarComponent, ApartamentoFormComponent],
  declarations: [ApartamentoMainComponent, ApartamentoListarComponent, ApartamentoFormComponent],
  providers:[ApartamentoService,EdificioService,MoradorService]
})
export class ApartamentoModule { }
