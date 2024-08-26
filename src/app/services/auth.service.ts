import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse, RegisterResponse } from '../authentication/auth-inteface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5162/api/users';

  constructor(private http: HttpClient) {}

  // Get the user's role from the JWT token stored in localStorage
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

  // Create HttpHeaders with Authorization if token exists
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // Register a new user
  register(user: any): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${this.baseUrl}/register`, user)
      .pipe(
        tap((response) => console.log('Registration successful:', response)),
        catchError((error) => {
          console.error('Registration error:', error.message || error);
          throw error;
        })
      );
  }

  // Login a user and store the JWT token in localStorage
  login(user: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, user)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            console.log('Login successful:', response);
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
    return this.http
      .get<boolean>(`${this.baseUrl}/verify-token`, { headers: this.getAuthHeaders() })
      .pipe(
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
