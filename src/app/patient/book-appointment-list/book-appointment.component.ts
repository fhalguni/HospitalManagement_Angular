import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { Doctor } from '../../models/doctor.model';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-book-appointment',
  standalone: false,
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css',
})
export class BookAppointmentComponent {
  token!: string | null;
  appointments: any[] = [];
  constructor(
    private patientService: PatientService,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((data) => (this.token = data));
    patientService
      .getAllAppointments()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.appointments = data;
      });
  }
  formatTimeSlot(timeSlot: string): string {
    const slotMapping: { [key: string]: string } = {
      '8-10': '8:00 AM - 10:00 AM',
      '11-1': '11:00 AM - 1:00 PM',
      '2-4': '2:00 PM - 4:00 PM',
    };

    return slotMapping[timeSlot] || timeSlot;
  }

  cancelAppointment(id: number) {
    this.patientService.cancelAppointment(id).subscribe(
      (response) => {
        console.log('Appointment cancelled:', response);

        Swal.fire(
          'Cancelled!',
          'Your appointment has been cancelled.',
          'success'
        ).then(() => {
          window.location.reload();
        });
      },

      (error) => {
        // Handle error response
        console.error('Error cancelling appointment:', error);

        // Optional: Show an error message using SweetAlert
        Swal.fire({
          title: 'Error!',
          text: 'Failed to cancel the appointment. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
