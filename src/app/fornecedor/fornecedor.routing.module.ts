import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { FornecedorMainComponent } from './fornecedor-main/fornecedor-main.component';
import { FornecedorListarComponent } from './fornecedor-listar/fornecedor-listar.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: FornecedorMainComponent, 
    children:[
    { path: 'listar', canActivate: [AuthService], component: FornecedorListarComponent, data: [{ claim: { nome: 'Fornecedor', valor: 'Ler' } }] },  
    { path: 'novo', canActivate: [AuthService], component: FornecedorFormComponent, data: [{ claim: { nome: 'Fornecedor', valor: 'Gravar' } }] },
    { path: 'editar/:id', canActivate: [AuthService], component: FornecedorFormComponent, data: [{ claim: { nome: 'Fornecedor', valor: 'Gravar' } }] }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }