import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvalidateTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        tap((token) => {
          if (token) {
            this.router.navigate(['/dashboard'])
          }
        }),
        map(() => true)
      );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        tap((token) => {
          if (token) {
            this.router.navigate(['/dashboard'])
          }
        }),
        map(() => true)
      );
  }
}
