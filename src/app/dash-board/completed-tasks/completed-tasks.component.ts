// completed-tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../DTOs/TaskDto';
@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private TaskService: TaskService) { }

  ngOnInit(): void {
    this.TaskService.getCompletedTasks().subscribe(data => {
      this.tasks = data;
    });
  }
}
