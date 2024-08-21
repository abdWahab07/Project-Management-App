import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UpdateProjectComponent } from './update-project/update-project.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCreateComponent,
    ProjectListComponent,
    UpdateProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
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
  ]
})
export class ProjectsModule { }
