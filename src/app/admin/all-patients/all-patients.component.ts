import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { map } from 'rxjs';
import { Patient } from '../../models/patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
        patient.email.toLowerCase().includes(term)
    );
  }

  isLoaded() {
    return this.adminService
      .getAllPatients()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.patients = data;
        console.log(data);
      });
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
    this.route.navigate(['/admin/getAppointments', id]);
  }

  activePatient(id: number) {
    const patient = this.patients.find((p) => p.id === id);
    console.log(patient);

    if (patient?.isActive === false) {
      Swal.fire({
        title: 'Activate Patient?',
        text: 'Are you sure you want to activate this patient?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, activate!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminService.activePatient(id).subscribe((data) => {
            console.log(data);
            Swal.fire(
              'Activated!',
              'The patient has been activated.',
              'success'
            );
            this.isLoaded();
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Delete Patient?',
        text: 'Are you sure you want to delete this patient?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminService.deletePatient(id).subscribe((data) => {
            console.log(data);
            Swal.fire('Deleted!', 'The patient has been deleted.', 'success');
            this.isLoaded();
          });
        }
      });
    }
  }
  // togglePatientStatus(patientId: number): void {
  //   const patient = this.patients.find(p => p.id === patientId);
  //   if (patient) {
  //     // Toggle the status
  //     const newStatus = !patient.isActive;

  //     this.patientService.updatePatientStatus(patientId, newStatus).subscribe(
  //       () => {
  //         patient.isActive = newStatus;
  //       },
  //       (error) => {
  //         console.error('Error updating patient status:', error);
  //       }
  //     );
  //   }
  // }
}
