import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { Observable, from, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse, RegisterResponse } from '../authentication/auth-inteface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5283/api/users';

  constructor() { }

  private getAuthHeaders(): AxiosRequestConfig {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    };
  }

  register(user: any): Observable<RegisterResponse> {
    return from(
      axios.post<RegisterResponse>(`${this.baseUrl}/register`, user)
        .then(response => response.data)
        .catch(error => {
          console.error('Registration error:', error);
          throw error;
        })
    );
  }

  login(user: any): Observable<LoginResponse> {
    return from(
      axios.post<LoginResponse>(`${this.baseUrl}/login`, user)
        .then(response => {
          if (response.data && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
          }
          return response.data;
        })
        .catch(error => {
          console.error('Login error:', error);
          throw error;
        })
    );
  }

  verifyToken(): Observable<boolean> {
    return from(
      axios.get<boolean>(`${this.baseUrl}/verify-token`, this.getAuthHeaders())
        .then(response => response.data)
        .catch(() => false) // Return false if there's an error
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
