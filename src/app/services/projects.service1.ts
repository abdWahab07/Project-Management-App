import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { ProjectDto } from '../DTOs/projects';
import { Task } from '../DTOs/TaskDto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService1 {
  private baseUrl = 'http://localhost/backend/api/projects';

  constructor() {}

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  getProjects(): Observable<ProjectDto[]> {
    return from(
      axios.get<ProjectDto[]>(this.baseUrl)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching projects:', error);
          throw error;
        })
    );
  }

  getProject(id: number): Observable<ProjectDto> {
    return from(
      axios.get<ProjectDto>(`${this.baseUrl}/${id}`)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching project:', error);
          throw error;
        })
    );
  }

  getProjectTasks(projectId: number): Observable<Task[]> {
    return from(
      axios.get<Task[]>(`${this.baseUrl}/tasks`, { params: { projectId } })
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching project tasks:', error);
          throw error;
        })
    );
  }

  deleteProject(id: number): Observable<void> {
    return from(
      axios.delete<void>(`${this.baseUrl}/${id}`)
        .then(() => undefined)
        .catch(error => {
          console.error('Error deleting project:', error);
          throw error;
        })
    );
  }

  updateProject(id: number, project: ProjectDto): Observable<ProjectDto> {
    return from(
      axios.put<ProjectDto>(`${this.baseUrl}/${id}`, project)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error updating project:', error);
          throw error;
        })
    );
  }
}
