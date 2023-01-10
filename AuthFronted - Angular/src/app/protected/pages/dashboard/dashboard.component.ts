import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuarioActual: Usuario = {
    id: '',
    name: '',
    email: ''
  };

  get getUsuario() {
    return this.authService.getUsuario;
  }

  constructor( private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
    this.usuarioActual = this.getUsuario;
   }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
