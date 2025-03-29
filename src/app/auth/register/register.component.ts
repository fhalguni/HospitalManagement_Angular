import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    this.authService
      .registerUser(this.registrationForm.value)
      .subscribe((res) => {
        console.log(res);
        this.route.navigate(['/login']);
      });
  }
}
