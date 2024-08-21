import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { EmployeesRoutingModule } from './employees-routing.module';
import { TeamManagementComponent } from './team-management/team-management.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    TeamManagementComponent,
    DeleteEmployeeComponent,
    TeamCreateComponent
  ],
  imports: [
    EmployeesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgStyle,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BarChartModule,
    NgxChartsModule,
    ListComponent
  ]
})
export class EmployeesModule { }
