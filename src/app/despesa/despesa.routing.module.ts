import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { DespesaMainComponent } from './despesa-main/despesa-main.component';
import { DespesaFormComponent } from './despesa-form/despesa-form.component';
import { DespesaListarComponent } from './despesa-listar/despesa-listar.component';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: DespesaMainComponent, 
    children:[
    { path: 'listar', canActivate: [AuthService], component: DespesaListarComponent, data: [{ claim: { nome: 'Despesa', valor: 'Ler' } }] },  
    { path: 'novo', canActivate: [AuthService], component: DespesaFormComponent, data: [{ claim: { nome: 'Despesa', valor: 'Gravar' } }] },
    { path: 'editar/:id', canActivate: [AuthService], component: DespesaFormComponent, data: [{ claim: { nome: 'Despesa', valor: 'Gravar' } }] }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DespesaRoutingModule { }