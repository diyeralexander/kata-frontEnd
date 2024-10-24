import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      console.log('Token:', response.token);
      localStorage.setItem('token', response.token);
      this.router.navigate(['/home']);
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        alert('Usuario o contraseña incorrectos.');
      } else {
        console.error('Error durante la solicitud:', error);
      }
    });
  }
}