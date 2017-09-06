import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';

//Shared
import { AuthService } from './shared/auth.service';

import {ToastModule} from 'ng2-toastr/ng2-toastr';

export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    ToastModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [AuthService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory 
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
