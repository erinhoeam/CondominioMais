import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { EdificioMainComponent } from './edificio-main/edificio-main.component';
import { EdificioListarComponent } from './edificio-listar/edificio-listar.component';
import { EdificioFormComponent } from './edificio-form/edificio-form.component';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: EdificioMainComponent, 
    children:[
    { path: 'listar', canActivate: [AuthService], component: EdificioListarComponent, data: [{ claim: { nome: 'Edificio', valor: 'Ler' } }] },  
    { path: 'novo', canActivate: [AuthService], component: EdificioFormComponent, data: [{ claim: { nome: 'Edificio', valor: 'Gravar' } }] },
    { path: 'editar/:id', canActivate: [AuthService], component: EdificioFormComponent, data: [{ claim: { nome: 'Edificio', valor: 'Gravar' } }] }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class EdificioRoutingModule { }