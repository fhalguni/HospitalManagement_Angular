import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { map } from 'rxjs';
import { Patient } from '../../models/patient.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-patients',
  standalone: false,
  templateUrl: './all-patients.component.html',
  styleUrl: './all-patients.component.css',
})
export class AllPatientsComponent {
  searchTerm: string = '';
  patients: Patient[] = [];
  constructor(
    private adminService: AdminService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.adminService
      .getAllPatients()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.patients = data;
        console.log(data);
      });
  }
  filteredPatients(): Patient[] {
    if (!this.searchTerm) {
      return this.patients;
    }

    const term = this.searchTerm.toLowerCase();
    return this.patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term) ||
        patient.medicalHistory.toLowerCase().includes(term) ||
        patient.currentMedication.toLowerCase().includes(term)
    );
  }

  deletePatient(id: number) {
    const patient = this.patients.find((p) => p.id === id);
    if (patient) {
      this.adminService.deletePatient(id).subscribe((data) => {
        console.log('Data deleted', data);
        patient.isActive = !patient.isActive;
      });
    }
  }

  getPatientsStatus(id: number) {
    const patient = this.patients.find((p) => p.id === id);
    return patient?.isActive;
  }
  getAppointmentOfPatients(id: number) {
    this.route.navigate(['/getAppointments', id]);
  }
}
