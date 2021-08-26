import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: any, state: RouterStateSnapshot) {
    if (this.authService.isSignIn()) return true

    this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } })
    return false
  }
}
