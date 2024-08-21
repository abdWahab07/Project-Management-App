import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../DTOs/TaskDto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  activeId: number | null = null;
  status: boolean | undefined;
  message: string | undefined;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTasks();

    // Check if there's a message in the route query parameters
    this.route.queryParams.subscribe(params => {
      this.message = params['message'];
      if (this.message) {
        this.status = true;
        // Refresh tasks after 2 seconds
        setTimeout(() => {
          this.loadTasks();
          this.status = false; // Hide the message after refresh
        }, 2000);
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  toggle(index: number): void {
    if (this.activeId === index) {
      this.activeId = null;
    } else {
      this.activeId = index;
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      // Redirect to the same component with a message
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { message: `Task with id: ${id} deleted from the list` },
        queryParamsHandling: 'merge', // merge with existing query params
      });
    }, error => {
      this.message = `Task can't be deleted. ID NOT FOUND!`;
      console.error('Error deleting task', error);
      this.status = false;
    });
  }

  updateTask(task: Task): void {
    this.router.navigate(['tasks/task-update', { id: task.taskId }]);
  }

  updateStatusToComplete(id: number): void {
    this.taskService.updateTaskStatus(id, 'complete').subscribe(() => {
      this.loadTasks();
    }, error => {
      console.error('Error updating task status', error);
    });
  }
}
