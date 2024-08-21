import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartModule, NgxChartsModule } from '@swimlane/ngx-charts';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { TaskListComponent } from './task-detail/task-detail.component';
import { TaskMainComponent } from './task-main/task-main.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { UpdateTaskComponent } from './task-update/task-update.component';
import { CreateTaskComponent } from './task-create/task-create.component';

@NgModule({
  declarations: [
    TasksComponent,
    TaskMainComponent,
    TaskListComponent,
    CreateTaskComponent,
    DeleteTaskComponent,
    TaskManagerComponent,
    UpdateTaskComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgStyle,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BarChartModule,
    NgxChartsModule
  ]
})
export class TasksModule { }
