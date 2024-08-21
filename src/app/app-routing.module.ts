import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'authebtication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'dashboard', loadChildren: () => import('./dash-board/dashboard.module').then(m => m.dashboardModule) , canActivate: [AuthGuard]},
  { path: 'report', loadChildren: () => import('./report-main/reports.modules').then(m => m.AuthenticationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
