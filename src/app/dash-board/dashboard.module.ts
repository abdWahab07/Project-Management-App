import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnounementPannelComponent } from './announement-pannel/announement-pannel.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { MainComponent } from './main/main.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { ProgressCalendarComponent } from './progress-calendar/progress-calendar.component';
import { ProgressChartComponent } from './progress-chart/progress-chart.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { WorkLoadComponent } from './work-load/work-load.component';
import { DashBoardComponent } from './dash-board.component';
import { ProjectCalendarComponent } from './project-calendar/project-calendar.component';
import { EmployeePerformanceComponent } from './employee-performance/employee-performance.component';
import { PrioritizeTaskComponent } from './prioritize-task/prioritize-task.component';
import { EmployeeTasksGraphsComponent } from './employee-tasks-graphs/employee-tasks-graphs.component';
import { DashboardRoutingModule } from './dash-board-routing.module';



@NgModule({
  declarations: [
    AnnouncementComponent,
    AnnounementPannelComponent,
    CompletedTasksComponent,
    MainComponent,
    PendingTasksComponent,
    ProgressCalendarComponent,
    ProgressChartComponent,
    ProjectCalendarComponent,
    SideBarComponent,
    WorkLoadComponent,
    DashBoardComponent,
    EmployeePerformanceComponent,
    PrioritizeTaskComponent,
    EmployeeTasksGraphsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgStyle,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BarChartModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class dashboardModule { }
