import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: any, state: RouterStateSnapshot) {
    let user = this.authService.CurrentUser
    if (user && this.authService.CurrentUser.admin) return true;

    this.router.navigate(['/forbidden'], { queryParams: { returnUrl: state.url } })
    return false
  }
}
