import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Doctor } from '../../models/doctor.model';
import { map } from 'rxjs';
import { SocketService } from '../../socket.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-add-book-appointment',
  standalone: false,
  templateUrl: './add-book-appointment.component.html',
  styleUrl: './add-book-appointment.component.css',
})
export class AddBookAppointmentComponent implements OnInit, OnDestroy {
  token!: string | null;
  appointments: any[] = [];
  patientCount: number = 0;
  constructor(
    private patientService: PatientService,
    private socketService: SocketService,
    private route: Router,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((data) => (this.token = data));
  }
  BookAppointmentForm = new FormGroup({
    doctorId: new FormControl(null, [Validators.required]),
    day: new FormControl(null, [Validators.required]),
    timeSlot: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.getAllDoctors();
    this.socketService.onEvent('patientCountUpdate', (data) => {
      console.log('Real-time patient count update:', data);
      this.patientCount = data.count; // Update the count in the frontend
    });
  }

  onSubmit() {
    if (this.BookAppointmentForm.valid) {
      this.patientService
        .bookAppointment(this.BookAppointmentForm.value)
        .pipe(map((res: any) => res.data))
        .subscribe(
          (data: any) => {
            // Show success alert
            Swal.fire({
              title: 'Appointment Booked!',
              text: `Your appointment has been successfully booked for ${
                this.BookAppointmentForm.get('day')?.value
              } during ${this.BookAppointmentForm.get('timeSlot')?.value}.`,
              icon: 'success',
              confirmButtonText: 'OK',
            });

            // Update appointments (if necessary) and reset the form
            this.appointments = data;
            this.route.navigate(['/bookAppointment']);
            this.BookAppointmentForm.reset();
          },
          (error: any) => {
            // Show error alert
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong while booking the appointment. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
    } else {
      // Optional: Show validation error if form is invalid
      Swal.fire({
        title: 'Invalid Form!',
        text: 'Please fill out all required fields before submitting.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }

  doctors: Doctor[] = [];
  getAllDoctors() {
    this.patientService
      .getAllDoctors()
      .pipe(map((res: any) => res.data))
      .subscribe((res) => {
        this.doctors = res;
      });
  }
  ngOnDestroy(): void {
    // Optional: Disconnect the socket when the component is destroyed
    this.socketService.disconnect();
  }
}
