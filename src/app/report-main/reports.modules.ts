import { HttpClientModule } from '@angular/common/http';
import { ReportRoutingModule } from './reports-routing.modules';
import { NgModule } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportComponent } from './report/report.component';
import { ProjectCardsComponent } from './report-main.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ReportComponent,
    ProjectCardsComponent
  ],
  imports: [
    ReportRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgStyle,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    BarChartModule,
    NgxChartsModule,
    PipesModule
  ]
})
export class AuthenticationModule { }
