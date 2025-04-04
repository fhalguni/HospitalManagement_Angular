import { Component } from '@angular/core';
import { PatientService } from '../../patient.service';
import { map } from 'rxjs';
import { Patient } from '../../../models/patient.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-patient-profile',
  standalone: false,
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css',
})
export class PatientProfileComponent {
  patient!: Patient;

  constructor(private patientService: PatientService) {
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
        window.location.reload();
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
}
