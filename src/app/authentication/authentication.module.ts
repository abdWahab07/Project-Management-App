import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgStyle } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BarChartModule } from '@swimlane/ngx-charts';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../services/auth.service';
import { AuthenticationRoutingModule } from './authentication-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgStyle,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BarChartModule,
    NgxChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [AuthService]
})
export class AuthenticationModule { }
