import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.verifyToken().pipe(
      map(isValid => {
        const expectedRole = route.data['role'];
        const userRole = this.authService.getUserRole();

        console.log('Expected Role:', expectedRole);
        console.log('User Role:', userRole);

        if (isValid && (!expectedRole || userRole === expectedRole)) {
          console.log('Access granted');
          return true;
        } else {
          console.log('Access denied, redirecting to login');
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        console.log('Error in AuthGuard, redirecting to login');
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

}
