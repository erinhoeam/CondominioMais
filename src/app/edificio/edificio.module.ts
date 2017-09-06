import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { EdificioRoutingModule } from './edificio.routing.module';
import { EdificioMainComponent } from './edificio-main/edificio-main.component';
import { EdificioListarComponent } from './edificio-listar/edificio-listar.component';
import { EdificioFormComponent } from './edificio-form/edificio-form.component';

import { EnderecoService } from './../services/endereco.service';
import { EdificioService } from './../services/edificio.service';

@NgModule({
  imports: [
    FormsModule,SharedModule,EdificioRoutingModule
  ],
  exports: [EdificioListarComponent, EdificioFormComponent],
  declarations: [EdificioMainComponent, EdificioListarComponent, EdificioFormComponent],
  providers:[EdificioService, EnderecoService]
})
export class EdificioModule { }
