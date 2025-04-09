import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { Doctor } from '../../models/doctor.model';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-book-appointment',
  standalone: false,
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css',
})
export class BookAppointmentComponent {
  token!: string | null;
  appointments: any[] = [];
  searchItem: string = '';
  filterAppointment: any[] = [];
  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private route: Router
  ) {
    this.authService.authState$.subscribe((data) => (this.token = data));
    this.isLoaded();
  }

  isLoaded() {
    return this.patientService
      .getAllAppointments()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        console.log(data);

        this.appointments = data;
        this.filterAppointment = this.appointments;
      });
  }

  filter() {
    if (!this.searchItem) {
      this.appointments;
    }
    const term = this.searchItem.toLowerCase();
    return this.filterAppointment.filter(
      (appointment) =>
        appointment.day.toLowerCase().includes(term) ||
        appointment.timeSlot.toLowerCase().includes(term) ||
        appointment.doctor?.name.toLowerCase().includes(term)
    );
  }
  filterAppointments(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    if (selectedValue === 'all') {
      this.patientService
        .getAllAppointments()
        .pipe(map((res: any) => res.data))
        .subscribe((data) => {
          this.appointments = data;
          this.filterAppointment = this.appointments;
        });
    } else {
      this.filterAppointment = this.appointments.filter(
        (appointment) =>
          appointment.status.toLowerCase() === selectedValue.toLowerCase()
      );
    }
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
        );
        this.isLoaded();
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
