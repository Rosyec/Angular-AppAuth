import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  miFormulario: FormGroup = this.formBuilder.group({
    email: ['checho@gmail.com', [Validators.email, Validators.required]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  public login(): void {

    const email: string = this.miFormulario.controls['email'].value;
    const password: string = this.miFormulario.controls['password'].value;

    this.authService.login( email, password ).subscribe({
      next: (response) => {
        if ( !response ) {
          this.router.navigate(['/dashboard']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response
          })
        }
      }
    });

  }

}
