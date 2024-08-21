import { Injectable } from '@angular/core';
import { NavbarLink } from '../DTOs/navbarLInks';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  logo = "../assets/logo.png"
  getNavbarLinks(): NavbarLink[] {
    return [
      { label: 'Home', route: '' },
      { label: 'Dashboard', route: 'dashboard/home' },
      { label: 'Project Task', route: 'tasks/home' },
      { label: 'Team', route: 'employees/home' },
      { label: 'reports', route: 'report/home'},
    ];
  }
}
