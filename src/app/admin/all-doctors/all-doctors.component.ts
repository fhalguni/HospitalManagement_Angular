import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { map } from 'rxjs';
import { Doctor } from '../../models/doctor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-doctors',
  standalone: false,
  templateUrl: './all-doctors.component.html',
  styleUrl: './all-doctors.component.css',
})
export class AllDoctorsComponent {
  searchTerm: string = '';
  doctors: Doctor[] = [];
  isDisplay = false;
  constructor(private adminService: AdminService, private route: Router) {
    this.adminService
      .getAllDoctors()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.doctors = data;
        console.log(data);
      });
  }
  filteredDoctors(): Doctor[] {
    if (!this.searchTerm) {
      return this.doctors;
    }

    const term = this.searchTerm.toLowerCase();
    return this.doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(term) ||
        doctor.speciality.toLowerCase().includes(term)
    );
  }

  showPassword(doctorId: number) {
    const doctor = this.doctors.some((d) => d.id === doctorId);
    if (doctor) {
      this.isDisplay = true;
    }
  }

  deleteDoctor(id: number) {
    console.log(id);

    this.adminService.deleteDoctor(id).subscribe((data) => {
      console.log('data deleted', data);
    });
  }

  getAppointment(id: number) {
    this.route.navigate(['/getDoctorAppointments', id]);
  }
}
