import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService1 } from '../services/projects.service1';
import { ProjectDto } from '../DTOs/projects';

@Component({
  selector: 'app-project-cards',
  templateUrl: './report-main.component.html',
  styleUrls: ['./report-main.component.css']
})
export class ProjectCardsComponent implements OnInit {
  projects: ProjectDto[] = [];

  constructor(
    private projectService: ProjectService1,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data: ProjectDto[]) => {
      this.projects = data;
    });
  }

  showReport(projectId: number): void {
    this.router.navigate(['report/report', projectId]);  // Correct the navigation path
  }
}
