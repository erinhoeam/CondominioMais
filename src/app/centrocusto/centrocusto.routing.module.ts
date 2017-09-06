import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { CentroCustoMainComponent } from './centrocusto-main/centrocusto-main.component';
import { CentroCustoListarComponent } from './centrocusto-listar/centrocusto-listar.component';
import { CentroCustoFormComponent } from './centrocusto-form/centrocusto-form.component';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: CentroCustoMainComponent, 
    children:[
    { path: 'listar', canActivate: [AuthService], component: CentroCustoListarComponent, data: [{ claim: { nome: 'CentroCusto', valor: 'Ler' } }] },  
    { path: 'novo', canActivate: [AuthService], component: CentroCustoFormComponent, data: [{ claim: { nome: 'CentroCusto', valor: 'Gravar' } }] },
    { path: 'editar/:id', canActivate: [AuthService], component: CentroCustoFormComponent, data: [{ claim: { nome: 'CentroCusto', valor: 'Gravar' } }] }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CentroCustoRoutingModule { }