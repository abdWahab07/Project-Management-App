import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService1 {
  private baseUrl = 'http://localhost/backend/api/tasks';

  constructor() {}

  private getAuthHeaders(): AxiosRequestConfig {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    };
  }

  createTask(task: any): Observable<any> {
    return from(
      axios.post(this.baseUrl, task, this.getAuthHeaders())
        .then(response => response.data)
        .catch(error => {
          console.error('Error creating task:', error);
          throw error;
        })
    );
  }
}
