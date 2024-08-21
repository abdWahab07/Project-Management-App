import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ProjectService1 } from '../../services/projects.service1';
import { Task } from '../../DTOs/TaskDto';
import { ProjectDto } from '../../DTOs/projects';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  projectId: number | null = null;
  tasks: Task[] = [];
  project: ProjectDto | undefined; // To hold a single project's credentials

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService1
  ) { }

  // In ReportComponent ngOnInit method
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const idParam = params.get('projectId');  // Ensure 'projectId' matches your route configuration
    if (idParam) {
      this.projectId = +idParam;
      console.log('Project ID:', this.projectId);  // Debug: Check if projectId is retrieved correctly
      if (this.projectId) {
        this.loadTasksForProject(this.projectId);
        this.loadCredentialsForProject(this.projectId);
      }
    } else {
      console.error('Project ID not found in route parameters');
    }
  });
}


  loadTasksForProject(projectId: number): void {
    console.log('Fetching tasks for project:', projectId);  // Debug
    this.taskService.getProjectTasks(projectId).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        console.log('Tasks loaded:', this.tasks);  // Debug: Verify tasks are loaded
      },
      (error) => {
        console.error('Error fetching tasks:', error);  // Debug: Log errors
      }
    );
  }

  loadCredentialsForProject(projectId: number): void {
    console.log('Fetching project details for project:', projectId);  // Debug
    this.projectService.getProject(projectId).subscribe(
      (project: ProjectDto) => {
        this.project = project;
        console.log('Project details loaded:', this.project);  // Debug: Verify project details
      },
      (error) => {
        console.error('Error fetching project details:', error);  // Debug: Log errors
      }
    );
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
  }

  downloadPdf(): void {
    if (this.project) {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text('Project Report', 14, 20);
      doc.setFontSize(12);
      doc.text(`Project: ${this.project.name}`, 14, 30);

      // Project Details
      doc.setFontSize(14);
      doc.text('Project Details:', 14, 50);
      doc.setFontSize(12);
      doc.text(`Project ID: ${this.project.projectId}`, 14, 60);
      doc.text(`Company Name: ${this.project.companyName}`, 14, 70);
      doc.text(`Start Date: ${this.formatDate(new Date(this.project.startDate))}`, 14, 80);
      doc.text(`End Date: ${this.formatDate(new Date(this.project.endDate))}`, 14, 90);
      doc.text(`Manager Name: ${this.project.managerName}`, 14, 100);
      doc.text(`Department Name: ${this.project.departmentName}`, 14, 110);

      // Add a line break
      doc.setDrawColor(200, 0, 0);
      doc.line(14, 115, 200, 115);
      doc.setDrawColor(0, 0, 0);

      // Tasks Table
      doc.setFontSize(14);
      doc.text('Assigned Tasks:', 14, 125);
      (doc as any).autoTable({
        startY: 130,
        head: [['Task Name', 'Assigned Employee']],
        body: this.tasks.map(task => [task.taskName, task.assignedEmployeeName]),
        theme: 'striped',
        margin: { left: 14, right: 14 }
      });

      // Save the PDF
      doc.save('project-report.pdf');
    }
  }

  approveReport(): void {
    // Implement the logic to update the project's status to "Approved"
    console.log('Report approved');
  }
}
