import { LoggingDetailComponent } from './logging-detail/logging-detail.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { LoggingRoutingModule } from './logging.routing.module';

import { LoggingMainComponent } from './logging-main/logging-main.component';
import { LoggingListarComponent } from './logging-listar/logging-listar.component';

import { LoggingService } from './../services/logging.service';

@NgModule({
  imports: [
    FormsModule,SharedModule,LoggingRoutingModule
  ],
  declarations: [LoggingMainComponent, LoggingDetailComponent, LoggingListarComponent],
  providers:[LoggingService]
})
export class LoggingModule { }
