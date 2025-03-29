import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private route: Router) {}

  logInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.authService
      .logInUser(this.logInForm.value.email!, this.logInForm.value.password!)
      .subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
      });
    this.route.navigate(['/bookAppointment']);
  }

  register() {
    this.route.navigate(['/register']);
  }
}
