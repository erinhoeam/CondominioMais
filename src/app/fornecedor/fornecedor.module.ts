import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FornecedorRoutingModule } from './fornecedor.routing.module';
import { FornecedorMainComponent } from './fornecedor-main/fornecedor-main.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListarComponent } from './fornecedor-listar/fornecedor-listar.component';

import { FornecedorService } from './../services/fornecedor.service';

@NgModule({
  imports: [
    FormsModule,SharedModule,FornecedorRoutingModule
  ],
  exports: [FornecedorListarComponent, FornecedorFormComponent],
  declarations: [FornecedorMainComponent, FornecedorFormComponent, FornecedorListarComponent],
  providers: [FornecedorService]
})
export class FornecedorModule { }
