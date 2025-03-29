import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { Doctor } from '../../models/doctor.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-book-appointment',
  standalone: false,
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css',
})
export class BookAppointmentComponent {
  appointments: any[] = [];
  constructor(private patientService: PatientService) {
    patientService
      .getAllAppointments()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.appointments = data;
      });
  }
}
