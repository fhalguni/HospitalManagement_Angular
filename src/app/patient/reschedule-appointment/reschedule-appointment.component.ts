import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

import { Doctor } from '../../models/doctor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../models/appointment.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reschedule-appointment',
  standalone: false,
  templateUrl: './reschedule-appointment.component.html',
  styleUrl: './reschedule-appointment.component.css',
})
export class RescheduleAppointmentComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const appointmentId = Number(this.route.snapshot.paramMap.get('id'));
  }
  BookAppointmentForm = new FormGroup({
    day: new FormControl<string | null>(null, [Validators.required]),
    timeSlot: new FormControl<string | null>(null, [Validators.required]),
    doctorId: new FormControl<number | null>(null, [Validators.required]),
  });

  ngOnInit() {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.patientService
      .getAllDoctors()
      .pipe(map((res: any) => res.data))
      .subscribe((res) => {
        this.doctors = res;
      });
  }

  onSubmit() {
    const appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Appointment ID:', appointmentId);
    // console.log('Form Data:', this.BookAppointmentForm.value); // Debug the form data

    this.patientService
      .rescheduleAppointment(appointmentId, this.BookAppointmentForm.value)
      .subscribe(
        (res: any) => {
          console.log('API Response:', res); // Debug successful response

          // Display success alert
          Swal.fire({
            icon: 'success',
            title: 'Appointment Rescheduled!',
            text: 'Your appointment has been successfully rescheduled.',
            confirmButtonText: 'OK',
          });
          this.router.navigate(['/bookAppointment']);
        },
        (err) => {
          console.error('API Error:', err); // Debug error response

          // Display error alert
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong. Please try again later.',
            confirmButtonText: 'OK',
          });
        }
      );
  }
}
