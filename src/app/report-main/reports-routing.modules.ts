import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCardsComponent } from './report-main.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: ProjectCardsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/:projectId',
    component: ReportComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
