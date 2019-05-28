import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from '../services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.loggedInUser) {
      return true;
    }

    // user is not logged in so login process should be started
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
