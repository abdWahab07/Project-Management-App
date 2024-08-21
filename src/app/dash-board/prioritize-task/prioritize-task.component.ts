import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../DTOs/TaskDto';

@Component({
  selector: 'app-prioritize-task',
  templateUrl: './prioritize-task.component.html',
  styleUrls: ['./prioritize-task.component.css']
})
export class PrioritizeTaskComponent implements OnInit {
  prioritizedTasks: Task[] = [];
  errorMessage: string | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        const now = new Date();
        const threeDaysFromNow = new Date(now);
        threeDaysFromNow.setDate(now.getDate() + 3);

        this.prioritizedTasks = tasks.filter(task => {
          const dueDate = new Date(task.endTime);
          return this.isDateWithinRange(dueDate, now, threeDaysFromNow);
        });

        this.errorMessage = null; // Clear any previous errors
      },
      error: (error: any) => {
        console.error('Error loading tasks:', error);
        this.errorMessage = 'An error occurred while loading tasks. Please try again later.';
      }
    });
  }

  isDateWithinRange(date: Date, startDate: Date, endDate: Date): boolean {
    // Reset the time part to compare only dates
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    return d >= start && d <= end;
  }
}
