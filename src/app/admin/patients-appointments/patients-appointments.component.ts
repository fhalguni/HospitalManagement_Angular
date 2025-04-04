import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-patients-appointments',
  standalone: false,
  templateUrl: './patients-appointments.component.html',
  styleUrl: './patients-appointments.component.css',
})
export class PatientsAppointmentsComponent {
  appointments: any[] = [];
  constructor(
    private adminService: AdminService,
    private router: ActivatedRoute
  ) {
    const id = Number(this.router.snapshot.paramMap.get('id')!);
    this.adminService
      .getAllAppointmentOfPatient(id)
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
}
