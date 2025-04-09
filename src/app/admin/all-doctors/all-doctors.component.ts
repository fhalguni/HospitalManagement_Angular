import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { map } from 'rxjs';
import { Doctor } from '../../models/doctor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrl: './all-doctors.component.css',
  standalone: false,
})
export class AllDoctorsComponent {
  searchTerm: string = '';
  doctors: Doctor[] = [];
  showPasswordId: number | null = null;
  isLoading = true;

  constructor(private adminService: AdminService, private router: Router) {
    this.loadDoctors();
  }

  loadDoctors() {
    this.isLoading = true;
    this.adminService
      .getAllDoctors()
      .pipe(map((res: any) => res.data))
      .subscribe({
        next: (data) => {
          this.doctors = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading doctors:', error);
          this.isLoading = false;
        },
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

  togglePassword(doctorId: number) {
    // If already showing this doctor's password, hide it
    if (this.showPasswordId === doctorId) {
      this.showPasswordId = null;
    } else {
      // Otherwise show this doctor's password
      this.showPasswordId = doctorId;
    }
  }

  confirmToggleActiveStatus(doctor: Doctor) {
    const action = doctor.isActive ? 'inactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} Dr. ${doctor.name}?`)) {
      this.toggleDoctorActiveStatus(doctor.id, !doctor.isActive);
    }
  }

  toggleDoctorActiveStatus(id: number, setActive: boolean) {
    const method = setActive
      ? this.adminService.activeDoctor(id)
      : this.adminService.deleteDoctor(id);

    method.subscribe({
      next: (data) => {
        console.log(
          `Doctor ${setActive ? 'activated' : 'inactivated'} successfully`,
          data
        );
        // Refresh the doctors list
        this.loadDoctors();
      },
      error: (error) => {
        console.error(
          `Error ${setActive ? 'activating' : 'inactivating'} doctor:`,
          error
        );
      },
    });
  }

  getAppointment(id: number) {
    this.router.navigate(['/admin/getDoctorAppointments', id]);
  }
}
