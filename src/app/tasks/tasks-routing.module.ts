import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { ProjectComponent } from '../projects/project/project.component';
import { TaskMainComponent } from './task-main/task-main.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { CreateTaskComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-detail/task-detail.component';
import { UpdateTaskComponent } from './task-update/task-update.component';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  { path: 'home', component: TaskManagerComponent },
  { path: 'task-menu', component: TaskMainComponent },
  {
    path: 'create-task',
    component: CreateTaskComponent,  canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  { path: 'display-tasks', component: TaskListComponent },
  {
    path: 'task-update',
    component: UpdateTaskComponent, canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
