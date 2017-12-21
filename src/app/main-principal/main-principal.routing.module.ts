import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPrincipalComponent } from './main-principal.component';

const ROUTES: Routes = [
    {
        path: '', component: MainPrincipalComponent,
        children: [
            { path: 'edificio', loadChildren: './../edificio/edificio.module#EdificioModule' },
            { path: 'apartamento', loadChildren: './../apartamento/apartamento.module#ApartamentoModule' },
            { path: 'home', loadChildren: './../home/home.module#HomeModule' },
            { path: 'usuario', loadChildren: './../usuario/usuario.module#UsuarioModule' },
            { path: 'login', loadChildren: './../login/login.module#LoginModule' },
            { path: 'fornecedor', loadChildren: './../fornecedor/fornecedor.module#FornecedorModule' },
            { path: 'centrocusto', loadChildren: './../centrocusto/centrocusto.module#CentroCustoModule' },
            { path: 'cliente', loadChildren: './../cliente/cliente.module#ClienteModule' },
            { path: 'despesa', loadChildren: './../despesa/despesa.module#DespesaModule' },
            { path: 'recebimento', loadChildren: './../recebimento/recebimento.module#RecebimentoModule' },
            { path: 'logging', loadChildren: './../logging/logging.module#LoggingModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MainPrincipalRoutingModule { }
