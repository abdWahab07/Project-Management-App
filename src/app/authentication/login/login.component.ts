import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';  // Import FontAwesome icons

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl : './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          // Redirect to the dashboard
          window.location.href = 'http://localhost:80/project/dashboard';
        },
        error: () => {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      });
  }
}
