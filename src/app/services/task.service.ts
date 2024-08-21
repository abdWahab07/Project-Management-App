import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../DTOs/TaskDto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:5283/api/tasks';

  constructor() {}

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  getTasks(): Observable<Task[]> {
    return from(
      axios.get<Task[]>(this.baseUrl)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching tasks:', error);
          throw error;
        })
    );
  }

  getProjectTasks(projectId: number): Observable<Task[]> {
    return from(
      axios.get<Task[]>(`${this.baseUrl}/byProject/${projectId}`)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching project tasks:', error);
          throw error;
        })
    );
  }

  getTaskById(id: number): Observable<Task> {
    return from(
      axios.get<Task>(`${this.baseUrl}/${id}`)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching task by ID:', error);
          throw error;
        })
    );
  }

  deleteTask(id: number): Observable<void> {
    return from(
      axios.delete<void>(`${this.baseUrl}/${id}`)
        .then(() => undefined)
        .catch(error => {
          console.error('Error deleting task:', error);
          throw error;
        })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return from(
      axios.put<Task>(`${this.baseUrl}/${task.taskId}`, task)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error updating task:', error);
          throw error;
        })
    );
  }

  updateTaskStatus(id: number, status: string): Observable<void> {
    return from(
      axios.patch<void>(`${this.baseUrl}/${id}/status`, { status })
        .then(() => undefined)
        .catch(error => {
          console.error('Error updating task status:', error);
          throw error;
        })
    );
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.getTasks().pipe(
      map(tasks => tasks.filter(task => task.status === 'complete'))
    );
  }

  getPendingTasks(): Observable<Task[]> {
    return this.getTasks().pipe(
      map(tasks => tasks.filter(task => task.status === 'pending'))
    );
  }
}
