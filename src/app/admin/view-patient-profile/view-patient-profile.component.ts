import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../patient/patient.service';
import { map } from 'rxjs';
import { Patient } from '../../models/patient.model';

import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../doctor/doctor.service';
import { AdminComponent } from '../admin.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-view-patient-profile',
  standalone: false,
  templateUrl: './view-patient-profile.component.html',
  styleUrl: './view-patient-profile.component.css',
})
export class ViewPatientProfileComponent implements OnInit {
  patient!: any;
  constructor(
    private patientService: PatientService,
    private adminService: AdminService,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = +this.router.snapshot.paramMap.get('id')!;
    console.log(id);

    this.adminService
      .getPatientProfile(id)
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.patient = data[0];
      });
  }
}
