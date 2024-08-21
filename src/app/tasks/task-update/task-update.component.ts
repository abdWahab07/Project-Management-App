import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ProjectService1 } from '../../services/projects.service1';
import { Task } from '../../DTOs/TaskDto';
import { ProjectDto } from '../../DTOs/projects';

@Component({
  selector: 'app-update-task',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number;
  projects: ProjectDto[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService1,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      projectId: [''],
      taskName: [''],
      assignedEmployeeName: [''],
      startTime: [''],
      endTime: [''],
      taskDetails: [''],
      percentageCompleted: [''],
      status: ['pending']
    });

    this.taskId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadTask();
    this.loadProjects();
  }

  loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe((task: Task) => {
      this.taskForm.patchValue(task);
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects: ProjectDto[]) => {
      this.projects = projects;
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.updateTask({ ...this.taskForm.value, taskId: this.taskId }).subscribe(() => {
        console.log('Task updated successfully');
        this.router.navigate(['/tasks']);
      }, error => {
        console.error('Error updating task', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
