import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  // Todo: Instead of using hasToken, use isLoggedIn(). We are not using yet because then we need to subscribe and code will be combursome  
  return inject(AuthService).hasToken()
    ? true
    : inject(Router).createUrlTree(['/login']);
};
