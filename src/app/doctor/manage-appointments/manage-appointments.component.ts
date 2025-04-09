import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Appointment } from '../../models/appointment.model';
import { debounceTime, map } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-manage-appointments',
  standalone: false,
  templateUrl: './manage-appointments.component.html',
  styleUrl: './manage-appointments.component.css',
})
export class ManageAppointmentsComponent {
  searchTerm: string = '';
  appointments: any[] = [];
  filterAppointment: any[] = [];

  constructor(
    private doctorService: DoctorService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.isLoaded();
  }

  isLoaded() {
    return this.doctorService
      .getAllAppointments()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.appointments = data;
        this.filterAppointment = this.appointments;
      });
  }
  filter() {
    if (!this.searchTerm) {
      this.appointments;
    }
    const term = this.searchTerm.toLowerCase();
    return this.filterAppointment.filter(
      (appointment) =>
        appointment.day.toLowerCase().includes(term) ||
        appointment.timeSlot.toLowerCase().includes(term) ||
        appointment.patient?.name.toLowerCase().includes(term)
    );
  }
  filterAppointments(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    if (selectedValue === 'all') {
      this.doctorService
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

  rejectAppointment(appointmentId: number) {
    this.doctorService.rejectAppointment(appointmentId).subscribe(
      (res) => {
        console.log('Appointment rejected', res);

        // Display success alert
        Swal.fire({
          icon: 'success',
          title: 'Appointment Rejected',
          text: 'The appointment has been successfully rejected.',
          confirmButtonText: 'OK',
        });

        // Remove the appointment from the list
        this.appointments.splice(
          this.appointments.findIndex(
            (appointment) => appointment.id === appointmentId
          ),
          1
        );
        this.isLoaded();
      },
      (err) => {
        console.error('Error rejecting appointment', err);

        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Please try again later.',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  confirmAppointment(appointmentId: number) {
    this.doctorService
      .confirmAppointment(appointmentId)
      .pipe(debounceTime(5000))
      .subscribe(
        (data) => {
          console.log('Appointment confirmed:', data);

          // Display success alert
          Swal.fire({
            icon: 'success',
            title: 'Appointment Confirmed',
            text: 'The appointment has been successfully confirmed.',
            confirmButtonText: 'OK',
          });
          this.isLoaded();
        },

        (error) => {
          console.error('Error confirming appointment:', error);

          // Display error alert
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong while confirming the appointment. Please try again later.',
            confirmButtonText: 'OK',
          });
        }
      );
  }
}
