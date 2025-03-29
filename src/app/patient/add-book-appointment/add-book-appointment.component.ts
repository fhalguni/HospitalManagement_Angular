import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Doctor } from '../../models/doctor.model';
import { map } from 'rxjs';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-add-book-appointment',
  standalone: false,
  templateUrl: './add-book-appointment.component.html',
  styleUrl: './add-book-appointment.component.css',
})
export class AddBookAppointmentComponent implements OnInit, OnDestroy {
  appointments: any[] = [];
  patientCount: number = 0;
  constructor(
    private patientService: PatientService,
    private socketService: SocketService
  ) {}
  BookAppointmentForm = new FormGroup({
    startSlot: new FormControl(null, [Validators.required]), // Date & time for start slot
    endSlot: new FormControl(null, [Validators.required]), // Date & time for end slot
    doctorId: new FormControl(null, [Validators.required]), // ID of the doctor
  });

  ngOnInit(): void {
    this.getAllDoctors();
    this.socketService.onEvent('patientCountUpdate', (data) => {
      console.log('Real-time patient count update:', data);
      this.patientCount = data.count; // Update the count in the frontend
    });
  }
  onSubmit() {
    this.patientService
      .bookAppointment(this.BookAppointmentForm.value)
      .pipe(map((res: any) => res.data))
      .subscribe((data: any) => (this.appointments = data));
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
