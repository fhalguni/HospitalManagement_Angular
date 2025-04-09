import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { debounce, debounceTime, interval, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  obs!: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private cookie: CookieService
  ) {}

  logInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.obs = this.logInForm.valueChanges
      .pipe(debounceTime(5000))
      .subscribe((data) => console.log(data));
  }
  onSubmit() {
    this.authService
      .logInUser(this.logInForm.value.email!, this.logInForm.value.password!)
      .pipe(debounceTime(8000))
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.role === 'patient')
            Swal.fire({
              title: 'Patient Login Successful!',
              text: 'Welcome to the Healthcare Management System.',
              icon: 'success',

              confirmButtonText: 'OK',
            }).then(() => {
              this.cookie.deleteAll();

              this.cookie.set('role', res.role);
              this.cookie.set('token', res.token);

              // Navigate to the "Book Appointment" page after SweetAlert
              this.route.navigate(['/patients/bookAppointment']);
            });
          else if (res.role === 'doctor') {
            Swal.fire({
              title: 'Doctor Login Successful!',
              text: 'Welcome to the Healthcare Management System.',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.cookie.deleteAll();

              this.cookie.set('role', res.role);
              this.cookie.set('token', res.token);

              this.route.navigate(['/doctors/manageAppointment']);
            });
          } else if (res.role === 'admin') {
            Swal.fire({
              title: 'Admin Login Successful!',
              text: 'Welcome to the Healthcare Management System.',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.cookie.deleteAll();

              this.cookie.set('role', res.role);
              this.cookie.set('token', res.token);

              this.route.navigate(['/admin/allPatients']);
            });
          }
        },
        (error) => {
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
