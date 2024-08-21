import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { listServices } from '../../services/list.service';
import { Employee } from '../../DTOs/Employee';
@Component({
  selector: 'employee-performance',
  templateUrl: './employee-performance.component.html',
  styleUrls: ['./employee-performance.component.css']
})
export class EmployeePerformanceComponent implements OnInit {
  lists: Employee[] = [];

  constructor(private listServices: listServices, private router: Router) { }

  ngOnInit(): void {
    this.listServices.getList().subscribe(data => {
      this.lists = data;
    });
  }

  onclck(employee: Employee): void {
    const totalTasks = employee.totalTasks;
    const pendingTasks = employee.pendingTasks;

    // Navigate to the TaskDetailsComponent with query parameters
    this.router.navigate(['dashboard/tasks-graphs'], {
      queryParams: { totalTasks, pendingTasks }
    });
  }
}
