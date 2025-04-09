import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PatientService } from '../../patient.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  constructor(private patientService: PatientService, private route: Router) {}
  editProfileForm = new FormGroup({
    age: new FormControl(''),
    gender: new FormControl(''),
    address: new FormControl(''),
    medicalHistory: new FormControl(''),
    currentMedication: new FormControl(''),
    allergies: new FormControl(''),
  });

  onSubmit() {
    this.patientService.editProfile(this.editProfileForm.value).subscribe(
      (res) => {
        console.log('patient edited', res);

        // SweetAlert code to show success message
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.route.navigate(['/patients/patient-profile']);
      },
      (err) => {
        console.error('Error editing profile:', err);

        // SweetAlert code to show error message
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue updating the profile. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  onCancel() {
    this.editProfileForm.reset();
  }
}
