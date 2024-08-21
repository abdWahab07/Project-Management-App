import { Component, OnInit } from '@angular/core';
import { ProjectService1 } from '../../services/projects.service1';
import { ProjectDto } from '../../DTOs/projects';
import { TaskService } from '../../services/task.service';
import { Task } from '../../DTOs/TaskDto';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.css']
})
export class ProgressChartComponent implements OnInit {
  projects: ProjectDto[] = [];
  errorMessage: string | null = null;

  constructor(
    private projectService: ProjectService1,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects: ProjectDto[]) => {
        this.projects = projects;
        this.errorMessage = null;

        // Load tasks for each project
        this.projects.forEach(project => {
          console.log(`Loading tasks for project ID: ${project.projectId}`);
          this.loadProjectTasks(project.projectId);
        });
      },
      error: (error: any) => {
        console.error('Error loading projects:', error);
        this.errorMessage = 'An error occurred while loading projects. Please try again later.';
      }
    });
  }


  loadProjectTasks(projectId: number): void {
    this.taskService.getProjectTasks(projectId).subscribe({
      next: (tasks: Task[]) => {
        const project = this.projects.find(p => p.projectId === projectId);
        if (project) {
          project.tasks = tasks || [];
        }
      },
      error: (error: any) => {
        console.error(`Error loading tasks for project ${projectId}:`, error);
      }
    });
  }


  getCompletedTasks(tasks: Task[] = []): Task[] {
    return tasks.filter(task => task.status.toLowerCase() === 'complete');
  }

  getPendingTasks(tasks: Task[] = []): Task[] {
    return tasks.filter(task => task.status.toLowerCase() === 'pending');
  }
}
