import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private route: Router) {}
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
    EmergencyContactName: new FormControl(''),
    EmergencyContactNumber: new FormControl(''),
  });

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.authService.registerUser(this.registrationForm.value).subscribe(
      (res) => {
        console.log(res);

        // Show success SweetAlert
        Swal.fire({
          title: 'Registration Successful!',
          text: 'You can now log in with your credentials.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Navigate to login page after alert
          this.route.navigate(['/login']);
        });
      },
      (error) => {
        console.error(error);

        // Show error SweetAlert
        Swal.fire({
          title: 'Registration Failed!',
          text: 'Please check your information and try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
