import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ClienteRoutingModule } from './cliente.routing.module';
import { ClienteMainComponent } from './cliente-main/cliente-main.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListarComponent } from './cliente-listar/cliente-listar.component';

import { ClienteService } from './../services/cliente.service';

@NgModule({
  imports: [
    FormsModule,SharedModule,ClienteRoutingModule
  ],
  exports: [ClienteListarComponent, ClienteFormComponent],
  declarations: [ClienteMainComponent, ClienteFormComponent, ClienteListarComponent],
  providers: [ClienteService]
})
export class ClienteModule { }
