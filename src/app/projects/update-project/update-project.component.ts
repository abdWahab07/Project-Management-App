import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService1 } from '../../services/projects.service1';
import { ProjectDto } from '../../DTOs/projects';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  updateProjectForm: FormGroup;
  projectId: number;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService1,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateProjectForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      managerName: ['', Validators.required],
      departmentName: ['', Validators.required],
      taskCounts: [0, Validators.required] // Default to 0 if not provided
    });
    this.projectId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject(): void {
    this.projectService.getProject(this.projectId).subscribe({
      next: (project: ProjectDto) => {
        if (project) {
          // Convert strings to Date objects if necessary
          const startDate = new Date(project.startDate);
          const endDate = new Date(project.endDate);

          this.updateProjectForm.patchValue({
            name: project.name,
            companyName: project.companyName,
            startDate: startDate.toISOString().split('T')[0], // Convert Date to string in yyyy-mm-dd format
            endDate: endDate.toISOString().split('T')[0],
            managerName: project.managerName,
            departmentName: project.departmentName,
            taskCounts: project.taskCounts
          });
        } else {
          console.error('Project not found');
        }
      },
      error: (err) => {
        console.error('Error loading project:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.updateProjectForm.valid) {
      const updatedProject: ProjectDto = {
        projectId: this.projectId,
        ...this.updateProjectForm.value
      };

      this.projectService.updateProject(this.projectId, updatedProject).subscribe({
        next: () => {
          this.updateProjectForm.reset();
          this.router.navigate(['/projects/display-projects']);
        },
        error: (err) => {
          console.error('Error updating project:', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}
