import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PatientService } from '../../patient.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-contact',
  standalone: false,
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css',
})
export class AddContactComponent {
  constructor(private patientService: PatientService, private route: Router) {}
  addContactForm = new FormGroup({
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  onSubmit() {
    this.patientService
      .addEmergencyContact(this.addContactForm.value)
      .subscribe(
        (res) => {
          console.log('Contact added', res);
          Swal.fire({
            title: 'Success!',
            text: 'Emergency contact has been added successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.route.navigate(['/patients/patient-profile']);
        },
        (error) => {
          console.error('Error adding contact', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add emergency contact. Please try again.',
            icon: 'error',
            confirmButtonText: 'Retry',
          });
        }
      );
  }
  onCancel() {
    this.addContactForm.reset();
  }
}
