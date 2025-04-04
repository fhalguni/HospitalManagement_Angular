import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Appointment } from '../../models/appointment.model';
import { map } from 'rxjs';
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
  constructor(
    private doctorService: DoctorService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.doctorService
      .getAllAppointments()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.appointments = data;
        console.log(data);
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

  // filteredPatients(): Appointment[] {
  //   if (!this.searchTerm) {
  //     return this.appointments;
  //   }

  //   const term = this.searchTerm.toLowerCase();
  //   return this.appointments.filter((appointment) =>
  //     appointment.name.toLowerCase().includes(term)
  //   );
  // }

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
    this.doctorService.confirmAppointment(appointmentId).subscribe(
      (data) => {
        console.log('Appointment confirmed:', data);

        // Display success alert
        Swal.fire({
          icon: 'success',
          title: 'Appointment Confirmed',
          text: 'The appointment has been successfully confirmed.',
          confirmButtonText: 'OK',
        });
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
