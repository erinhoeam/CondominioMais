import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { ApartamentoMainComponent } from './apartamento-main/apartamento-main.component';
import { ApartamentoListarComponent } from './apartamento-listar/apartamento-listar.component';
import { ApartamentoFormComponent } from './apartamento-form/apartamento-form.component';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: ApartamentoMainComponent, 
    children:[
    { path: 'listar', canActivate: [AuthService], component: ApartamentoListarComponent, data: [{ claim: { nome: 'Apartamento', valor: 'Ler' } }] },  
    { path: 'novo', canActivate: [AuthService], component: ApartamentoFormComponent, data: [{ claim: { nome: 'Apartamento', valor: 'Gravar' } }] },
    { path: 'editar/:id', canActivate: [AuthService], component: ApartamentoFormComponent, data: [{ claim: { nome: 'Apartamento', valor: 'Gravar' } }] }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ApartamentoRoutingModule { }