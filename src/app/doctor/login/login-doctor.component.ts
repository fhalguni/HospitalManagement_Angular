import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-doctor',
  standalone: false,
  templateUrl: './login-doctor.component.html',
  styleUrl: './login-doctor.component.css',
})
export class DoctorLoginComponent {
  constructor(private doctorService: DoctorService, private route: Router) {}

  logInFormDoctor = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onDoctorSubmit() {
    this.doctorService
      .logInDoctor(this.logInFormDoctor.value)
      .subscribe((res: any) => {
        localStorage.setItem('role', 'doctor');
        localStorage.setItem('doctorToken', res.token);
        localStorage.removeItem('token');
      });
    this.route.navigate(['/manageAppointment']);
  }
}
