import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
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

  // Custom validator for password matching
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (
        password &&
        confirmPassword &&
        password.value !== confirmPassword.value
      ) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  // Custom validator for gender values
  genderValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validGenders = ['Male', 'Female', 'Other'];
      return validGenders.includes(control.value)
        ? null
        : { invalidGender: true };
    };
  }

  registrationForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]*$'),
      ]),
      gender: new FormControl('', [
        Validators.required,
        this.genderValidator(),
      ]),
      address: new FormControl('', [Validators.maxLength(100)]),
      medicalHistory: new FormControl(''),
      currentMedication: new FormControl(''),
      allergies: new FormControl(''),
      EmergencyContactName: new FormControl('', [Validators.required]),
      EmergencyContactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
    },
    { validators: this.passwordMatchValidator() }
  );

  // Getters for form controls to use in template
  get nameControl() {
    return this.registrationForm.get('name');
  }
  get emailControl() {
    return this.registrationForm.get('email');
  }
  get passwordControl() {
    return this.registrationForm.get('password');
  }
  get confirmPasswordControl() {
    return this.registrationForm.get('confirmPassword');
  }
  get ageControl() {
    return this.registrationForm.get('age');
  }
  get genderControl() {
    return this.registrationForm.get('gender');
  }
  get addressControl() {
    return this.registrationForm.get('address');
  }
  get emergencyContactNameControl() {
    return this.registrationForm.get('EmergencyContactName');
  }
  get emergencyContactNumberControl() {
    return this.registrationForm.get('EmergencyContactNumber');
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registrationForm.controls).forEach((key) => {
        const control = this.registrationForm.get(key);
        control?.markAsTouched();
      });
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
          text:
            error.error?.message ||
            'Please check your information and try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
