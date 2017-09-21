import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { RecebimentoMainComponent } from './recebimento-main/recebimento-main.component';
import { RecebimentoFormComponent } from './recebimento-form/recebimento-form.component';
import { RecebimentoListarComponent } from './recebimento-listar/recebimento-listar.component';
import { RecebimentoBoletoComponent } from './recebimento-boleto/recebimento-boleto.component';
import { RecebimentosBoletosComponent } from './recebimentos-boletos/recebimentos-boletos.component';
import { RecebimentoInadimplentesComponent } from './recebimento-inadimplentes/recebimento-inadimplentes.component';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: RecebimentoMainComponent, 
    children:[
    { path: 'listar', canActivate: [AuthService], component: RecebimentoListarComponent, data: [{ claim: { nome: 'Recebimento', valor: 'Ler' } }] },  
    { path: 'novo', canActivate: [AuthService], component: RecebimentoFormComponent, data: [{ claim: { nome: 'Recebimento', valor: 'Gravar' } }] },
    { path: 'boletos', canActivate: [AuthService], component: RecebimentosBoletosComponent, data: [{ claim: { nome: 'Recebimento', valor: 'Gravar' } }] },
    { path: 'inadimplentes', canActivate: [AuthService], component: RecebimentoInadimplentesComponent, data: [{ claim: { nome: 'Recebimento', valor: 'Ler' } }] },
    { path: 'editar/:id', canActivate: [AuthService], component: RecebimentoFormComponent, data: [{ claim: { nome: 'Recebimento', valor: 'Gravar' } }] },
    { path: 'boleto/:id', component: RecebimentoBoletoComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RecebimentoRoutingModule { }