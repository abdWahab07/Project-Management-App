import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService1 } from './createTask.services';
import { ProjectService1 } from '../../services/projects.service1';

@Component({
  selector: 'app-create-task',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;
  projects: any[] = [];
  status : boolean | undefined;
  message : string | undefined;

  constructor(
    private fb: FormBuilder,
    private taskService1: TaskService1,
    private projectService1: ProjectService1
  ) {
    this.taskForm = this.fb.group({
      projectId: [''],
      taskName: [''],
      assignedEmployeeName: [''],
      startDate: [''],
      endDate: [''],
      taskDetails: [''],
      percentageCompleted: [''],
      status: ['pending']
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService1.getProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.error('Error loading projects', error);
      }
    );
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      console.log(taskData);
      this.taskService1.createTask(taskData).subscribe({
        next: (response) => {
          // Handle successful task creation
          this.taskForm.reset();
          this.message ='Task created successfully';
          console.log(this.message);
          this.status = true;
        },
        error: (error) => {
          console.error
          this.message = `Error creating task invalid form data`;
          console.log(this.message);
          this.status = false;
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
