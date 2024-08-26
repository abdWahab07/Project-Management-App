import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AuthGuard } from '../authentication/auth.guard';

const routes: Routes = [
  { path: 'home', component: ProjectComponent },
  {
    path: 'create-project',
    component: ProjectCreateComponent,
    canActivate: [AuthGuard],  // Protect route with AuthGuard
    data: { role: 'admin' },  // Specify required role
  },
  { path: 'display-projects', component: ProjectListComponent },
  {
    path: 'update-project/:id',
    component: UpdateProjectComponent,
    canActivate: [AuthGuard],  // Protect route with AuthGuard
    data: { role: 'admin' },  // Specify required role
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
