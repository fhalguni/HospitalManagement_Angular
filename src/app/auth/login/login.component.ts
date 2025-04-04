import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs';
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
      .pipe(debounceTime(2000))
      .subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.removeItem('doctorToken');

          // SweetAlert for successful login
          Swal.fire({
            title: 'Login Successful!',
            text: 'Welcome to the Healthcare Management System.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            // Navigate to the "Book Appointment" page after SweetAlert
            this.route.navigate(['/bookAppointment']);
          });
        },
        (error) => {
          // SweetAlert for login error
          Swal.fire({
            title: 'Login Failed!',
            text: 'Invalid email or password. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
  }

  register() {
    this.route.navigate(['/register']);
  }
}
