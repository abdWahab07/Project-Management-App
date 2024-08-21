import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from './project-create.services';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  projectForm: FormGroup;
  submited: boolean | undefined;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      managerName: ['', Validators.required],
      departmentName: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
      project.startDate = new Date(project.startDate).toISOString();
      project.endDate = new Date(project.endDate).toISOString();

      this.projectService.createProject(project).subscribe({
        next: () => {
          console.log('Project created successfully');
          this.submited = true;
          this.projectForm.reset(); // Clear the form after submission
        },
        error: (error) => {
          console.error('Error creating project', error);
          this.submited = false;
        }
      });
    }
  }
}
