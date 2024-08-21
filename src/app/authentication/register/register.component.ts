import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.register({ username: this.username, password: this.password, email: this.email })
      .subscribe({
        next: () => {
          // Redirect or display success message
          window.location.href = '/login'; // Change according to your routing
        },
        error: () => {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
  }
}
