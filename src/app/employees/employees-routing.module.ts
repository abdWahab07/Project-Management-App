import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'home', component: TeamManagementComponent },
  { path: 'create-employee', component: TeamCreateComponent },
  { path: 'employees-list', component: ListComponent  },
  { path: 'delete-employee', component: DeleteEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
