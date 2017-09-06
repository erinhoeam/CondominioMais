import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { CarouselModule } from "ngx-bootstrap/carousel";
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HomeService } from './../services/home.service';
import { DespesaService } from './../services/despesa.service';
import { RecebimentoService } from './../services/recebimento.service';

import { ChartModule } from 'angular2-highcharts';

@NgModule({
    imports: [SharedModule,
        CarouselModule.forRoot(),
        HomeRoutingModule,
        ChartModule
    ],
    exports: [HomeComponent, DashboardComponent],
    declarations: [HomeComponent, AcessoNegadoComponent, HomeMainComponent, DashboardComponent],
    providers: [HomeService, DespesaService, RecebimentoService],
})
export class HomeModule { }
