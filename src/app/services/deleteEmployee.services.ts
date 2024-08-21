import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5283/api/Employees';

  constructor() {}

  deleteEmployee(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`)
      .then(response => {
        // Handle success response if needed
        console.log('Employee deleted successfully');
      })
      .catch(error => {
        // Handle error response
        console.error('Error deleting employee:', error);
        throw error; // Re-throw error to be handled by the component
      });
  }
}
