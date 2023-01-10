import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_BASE: string = environment.URL_BASE;

  private usuario!: Usuario;

  constructor(private http: HttpClient) { }

  public register( name: string, email: string, password: string ) {
    return this.http.post<AuthResponse>(`${this.URL_BASE}/auth/register`, { name, email, password })
        .pipe(
          tap( (resp) => {
            if (!resp.error) {
              localStorage.setItem('token', resp.token!);
  
            }
          }),
          map( (resp) => resp.error  ),
          catchError( (err) => of(err.error.msg) ),
        );
  }

  public login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.URL_BASE}/auth/login`, { email, password })
      .pipe(
        tap((resp) => {
          if (!resp.error) {
              localStorage.setItem('token', resp.token!);
              
            }
        }),
        map((resp) => resp.error ),//Los map retorna la informacion mutada mientras que un switchMap retorna un observable
         catchError((err) => of(err.error.msg)),
      );
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public validarToken(): Observable<boolean> {

    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(`${environment.URL_BASE}/auth/validate`, { headers })
        .pipe(
          map( (resp) => {
            if ( !resp.error ) {
              localStorage.setItem('token', resp.token!);
              this.usuario = {
                id: resp.id!,
                name: resp.name!,
                email: resp.email!
              }
              return true;
            }
            return false;
          }),
        catchError( (err) => of(false) ));
  }

  get getUsuario(): Usuario {
    return { ...this.usuario };
  }

}
