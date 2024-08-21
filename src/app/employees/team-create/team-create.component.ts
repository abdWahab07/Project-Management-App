import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { listServices } from '../../services/list.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './team-create.component.html',

  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent {
  employeeForm: FormGroup;
  image: File | null = null;
  status: boolean | undefined;
  messege: string | undefined;

  constructor(
    private fb: FormBuilder,
    private employeeService: listServices
  ) {
    this.employeeForm = this.fb.group({
      name: [''],
      designation: [''],
      experience: [0],
      description: [''],
      pastDesignation: [''],
      username: [''],
      password: [''],
      gmail: [''],
      image: [null],
      tasksAssigned: 0,
      tasksPending: 0,
      tasksCompleted: 0,
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.image = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeDto = { ...this.employeeForm.value, image: this.image };
      this.employeeService.createEmployee(employeeDto).subscribe(
        response => {
          console.log('Employee added successfully', response);
          this.employeeForm.reset();
          this.status = true;
          this.messege = "Employee Added Successfully";
        },
        error => {
          console.error('Error adding employee', error);
          this.status = false;
          this.messege = "Field cant be empty or invalid!";
        }
      );
    } else {
      console.error('Form is invalid');

    }
  }
}
