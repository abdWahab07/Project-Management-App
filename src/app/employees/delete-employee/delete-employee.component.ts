import { Component } from '@angular/core';
import { EmployeeService } from '../../services/deleteEmployee.services';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent {
  employeeId!: number;
  message: string | undefined;

  constructor(private employeeService: EmployeeService) {}

  onDelete(): void {
    this.employeeService.deleteEmployee(this.employeeId)
      .then(() => {
        this.message = `Employee with ID ${this.employeeId} has been deleted.`;
      })
      .catch(error => {
        this.message = `Error: ${error.message}`;
        console.error('Error deleting employee:', error);
      });
  }
}
