import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService1 } from '../../services/projects.service1';
import { ProjectDto } from '../../DTOs/projects';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: ProjectDto[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private projectService: ProjectService1, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects()
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to load projects. Please try again later.';
          console.error('Error loading projects:', error);
          return of([]); // Return an empty array as a fallback
        })
      )
      .subscribe((data: ProjectDto[]) => {
        this.projects = data;
        this.errorMessage = null; // Clear any previous error messages
        this.successMessage = null; // Clear any previous success messages
      });
  }

  editProject(id: number): void {
    console.log('Editing project with id:', id); // Logging the project ID
    this.router.navigate(['projects/update-project/', id]);
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id)
        .pipe(
          catchError(error => {
            this.errorMessage = `Failed to delete project with id ${id}. Please try again later.`;
            console.error('Error deleting project:', error);
            return of(null); // Return null to signify that the deletion failed
          })
        )
        .subscribe(result => {
          if (result !== null) {
            this.successMessage = `Project with id ${id} was deleted successfully`;
            console.log(this.successMessage);
            // Instead of reloading the whole page, we reload the list of projects
            this.loadProjects();
          }
        });
    }
  }
}
