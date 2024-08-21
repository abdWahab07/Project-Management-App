import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnounementPannelComponent } from './announement-pannel/announement-pannel.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { MainComponent } from './main/main.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { ProgressCalendarComponent } from './progress-calendar/progress-calendar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { WorkLoadComponent } from './work-load/work-load.component';
import { DashBoardComponent } from './dash-board.component';
import { EmployeePerformanceComponent } from './employee-performance/employee-performance.component';
import { PrioritizeTaskComponent } from './prioritize-task/prioritize-task.component';
import { EmployeeTasksGraphsComponent } from './employee-tasks-graphs/employee-tasks-graphs.component';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  { path: 'home', component: DashBoardComponent, canActivate: [AuthGuard] },
  { path: 'announcement-pannel', component: AnnounementPannelComponent },
  { path: 'completed-tasks', component: CompletedTasksComponent },
  { path: 'main', component: MainComponent },
  { path: 'pending-tasks', component: PendingTasksComponent },
  { path: 'progress-calender', component: ProgressCalendarComponent },
  { path: 'side-bar', component: SideBarComponent },
  { path: 'work-load', component: WorkLoadComponent },
  { path: 'employee-performance', component: EmployeePerformanceComponent },
  { path: 'prioritize-component', component: PrioritizeTaskComponent },
  { path: 'tasks-graphs', component: EmployeeTasksGraphsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
