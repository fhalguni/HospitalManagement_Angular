import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../patient.service';
import { map } from 'rxjs';
import { Patient } from '../../../models/patient.model';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-profile',
  standalone: false,
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css',
})
export class PatientProfileComponent implements OnInit {
  showPasswordDialog = false;
  patient!: Patient;

  passwordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private patientService: PatientService,
    private cookie: CookieService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getPatientDetail();
  }

  getPatientDetail() {
    this.patientService
      .getPatient()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        {
          this.patient = data;
          console.log(this.patient.contactDetails[0]);
        }
      });
  }
  editProfile() {
    this.route.navigate(['']);
  }

  openPasswordDialog() {
    this.showPasswordDialog = true;
    this.passwordForm.reset();
  }

  deleteEmergencyContact(contactId: number) {
    this.patientService.deleteEmergencyContact(contactId).subscribe(
      (res) => {
        console.log('Contact deleted', res);
        Swal.fire({
          title: 'Deleted!',
          text: 'The emergency contact has been successfully removed.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.getPatientDetail();
      },
      (error) => {
        console.error('Error deleting contact', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the emergency contact. Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    );
  }
  closePasswordDialog() {
    this.showPasswordDialog = false;
  }
  updatePassword() {
    this.patientService.changePassword(this.passwordForm.value).subscribe(
      (data) => {
        console.log('success', data);
        Swal.fire({
          icon: 'success',
          title: 'Password Updated',
          text: 'Your password has been successfully updated!',
          confirmButtonText: 'OK',
        });
        this.cookie.deleteAll();
        this.showPasswordDialog = false;
        Swal.fire({
          icon: 'success',
          title: 'Log In Again with new Credentials',
          text: 'You are logged out successfully',
          confirmButtonText: 'OK',
        });
        this.route.navigate(['/login']);
      },
      (error) => {
        console.error('error', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was an error updating your password. Please try again!',
          confirmButtonText: 'Retry',
        });
      }
    );
  }
}
