import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
      return this.authService.validarToken()
          .pipe(
            tap( (token) => {
              if ( !token ) {
                this.router.navigate(['/auth/login'])
              }
            } )
          );
  }
  canLoad(): Observable<boolean> | boolean {
      return this.authService.validarToken()
      .pipe(
        tap( (token) => {
          if ( !token ) {
            this.router.navigate(['/auth/login'])
          }
        } )
      );
  }
}