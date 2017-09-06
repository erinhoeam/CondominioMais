import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { ClienteMainComponent } from './cliente-main/cliente-main.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListarComponent } from './cliente-listar/cliente-listar.component';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: ClienteMainComponent, 
    children:[
    { path: 'listar', canActivate: [AuthService], component: ClienteListarComponent, data: [{ claim: { nome: 'Cliente', valor: 'Ler' } }] },  
    { path: 'novo', canActivate: [AuthService], component: ClienteFormComponent, data: [{ claim: { nome: 'Cliente', valor: 'Gravar' } }] },
    { path: 'editar/:id', canActivate: [AuthService], component: ClienteFormComponent, data: [{ claim: { nome: 'Cliente', valor: 'Gravar' } }] }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }