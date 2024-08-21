import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { Employee } from '../DTOs/Employee';

@Injectable({
  providedIn: 'root'
})
export class listServices {
  private apiUrl = 'http://localhost:5283/api/Employees';

  constructor() {}

  private handleResponse(response: AxiosResponse<any>) {
    return response.data;
  }

  createEmployee(employeeDto: Employee): Observable<any> {
    const formData = new FormData();
    formData.append('name', employeeDto.name);
    formData.append('designation', employeeDto.designation);
    formData.append('experience', employeeDto.experience.toString());
    formData.append('description', employeeDto.description);
    formData.append('pastDesignation', employeeDto.pastDesignation);
    formData.append('username', employeeDto.username);
    formData.append('password', employeeDto.password);
    formData.append('login', employeeDto.login);
    formData.append('gmail', employeeDto.gmail);
    if (employeeDto.image) {
      if (typeof employeeDto.image === 'string') {
        formData.append('image', employeeDto.image); // For base64 string
      } else {
        formData.append('image', employeeDto.image); // For File object
      }
    }

    return from(
      axios.post(this.apiUrl, formData)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error creating employee:', error);
          throw error;
        })
    );
  }

  updateEmployee(id: number, employeeDto: Employee): Observable<any> {
    const formData = new FormData();
    formData.append('name', employeeDto.name);
    formData.append('designation', employeeDto.designation);
    formData.append('experience', employeeDto.experience.toString());
    formData.append('description', employeeDto.description);
    formData.append('pastDesignation', employeeDto.pastDesignation);
    formData.append('username', employeeDto.username);
    formData.append('password', employeeDto.password);
    formData.append('gmail', employeeDto.gmail);
    formData.append('login', employeeDto.login);
    if (employeeDto.image) {
      if (typeof employeeDto.image === 'string') {
        formData.append('image', employeeDto.image); // For base64 string
      } else {
        formData.append('image', employeeDto.image); // For File object
      }
    }

    return from(
      axios.put(`${this.apiUrl}/${id}`, formData)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error updating employee:', error);
          throw error;
        })
    );
  }

  getList(): Observable<Employee[]> {
    return from(
      axios.get(this.apiUrl)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching employee list:', error);
          throw error;
        })
    );
  }

  getEmployeeByUsername(username: string): Observable<Employee> {
    return from(
      axios.get(`${this.apiUrl}/username/${username}`)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching employee by username:', error);
          throw error;
        })
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return from(
      axios.get(`${this.apiUrl}/${id}`)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching employee by ID:', error);
          throw error;
        })
    );
  }
}
