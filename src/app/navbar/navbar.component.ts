import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { NavbarLink } from '../DTOs/navbarLInks';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navbar: NavbarLink[];
  logo: string | undefined;
  faUser = faUser;

  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.navbar = this.navbarService.getNavbarLinks();
    this.logo = this.navbarService.logo;
  }

  logout(): void {
    this.authService.logout();
    // Redirect to the login page after logging out
    this.router.navigate(['/authebtication/login']);
  }
}
