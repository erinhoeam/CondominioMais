import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggingMainComponent } from './logging-main/logging-main.component';
import { LoggingDetailComponent } from './logging-detail/logging-detail.component';
import { LoggingListarComponent } from './logging-listar/logging-listar.component';

import { AuthService } from './../shared/auth.service';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: LoggingMainComponent, 
    children:[
      { path: 'listar', canActivate: [AuthService], component: LoggingListarComponent, data: [{ claim: { nome: 'Logging', valor: 'Ler' } }] },  
      { path: 'detail/:id', canActivate: [AuthService], component: LoggingDetailComponent, data: [{ claim: { nome: 'Logging', valor: 'Ler' } }] }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LoggingRoutingModule { }