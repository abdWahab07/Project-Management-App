import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:5162/api/projects';

  constructor() {}

  private getAuthHeaders(): AxiosRequestConfig {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    };
  }

  createProject(project: any): Observable<any> {
    return from(
      axios.post(this.baseUrl, project, this.getAuthHeaders())
        .then(response => response.data)
        .catch(error => {
          console.error('Error creating project:', error);
          throw error;
        })
    );
  }
}
