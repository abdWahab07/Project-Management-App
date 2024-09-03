import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Observable, from, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginResponse, RegisterResponse } from '../authentication/auth-inteface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost/backend/api/users';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Get the user's role from the JWT token stored in localStorage
  getUserRole(): string {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Debug: Log the token
    if (!token) return '';

    const decodedToken = this.decodeToken(token);
    console.log('Decoded Token:', decodedToken); // Debug: Log the decoded token
    return decodedToken?.unique_name || ''; // Extract the role from the token
  }

  // Decode JWT token to extract payload information
  private decodeToken(token: string): any {
    try {
      const payload = atob(token.split('.')[1]);
      const decoded = JSON.parse(payload);
      console.log('Decoded Payload:', decoded); // Debug: Log the decoded payload
      return decoded;
    } catch (e) {
      console.error('Token decoding error:', e); // Log any errors in decoding
      return null;
    }
  }

  // Create Axios headers with Authorization if token exists
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      Authorization: token ? `Bearer ${token}` : '',
    };
  }

  // Register a new user
  register(user: any): Observable<RegisterResponse> {
    return from(
      this.axiosInstance.post<RegisterResponse>('/register', user)
    ).pipe(
      map((response: AxiosResponse<RegisterResponse>) => response.data), // Extract the data from AxiosResponse
      tap((data) => console.log('Registration successful:', data)),
      catchError((error) => {
        console.error('Registration error:', error.message || error);
        throw error;
      })
    );
  }

  // Login a user and store the JWT token in localStorage
  login(user: any): Observable<LoginResponse> {
    return from(
      this.axiosInstance.post<LoginResponse>('/login', user)
    ).pipe(
      map((response: AxiosResponse<LoginResponse>) => response.data), // Extract the data from AxiosResponse
      tap((data) => {
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          console.log('Login successful:', data);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error.message || error);
        throw error;
      })
    );
  }

  // Verify if the stored JWT token is valid
  verifyToken(): Observable<boolean> {
    return from(
      this.axiosInstance.get<boolean>('/verify-token', { headers: this.getAuthHeaders() })
    ).pipe(
      map((response: AxiosResponse<boolean>) => response.data), // Extract the data from AxiosResponse
      catchError((error) => {
        console.error('Token verification error:', error.message || error);
        return of(false); // Return false if there's an error
      })
    );
  }

  // Logout the user by removing the token from localStorage
  logout(): void {
    localStorage.removeItem('authToken');
    console.log('User logged out successfully');
  }
}
