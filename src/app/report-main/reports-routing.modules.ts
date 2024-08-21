import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCardsComponent } from './report-main.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'home', component: ProjectCardsComponent },
  { path: 'report/:projectId', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
