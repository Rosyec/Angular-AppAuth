import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  miFormulario: FormGroup = this.formBuilder.group({
    name: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ]
  });

  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
  }

  public register(): void {

    const { name, email, password } = this.miFormulario.value;

    this.authService.register( name, email, password )
        .subscribe( { 
          next: ( response ) => {
            if ( !response ) {
              this.router.navigate(['/dashboard']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response,
              })
            }
          } 
        } );
  }

}
