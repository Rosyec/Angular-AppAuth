import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvalidateTokenGuard } from '../guards/invalidate-token.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: 'login', component: LoginComponent,
      },
      {
        path: 'register', component: RegisterComponent 
      },
      {
        path: '**', redirectTo: 'login'
      }
    ], canActivate: [ InvalidateTokenGuard ],
    canLoad: [ InvalidateTokenGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
