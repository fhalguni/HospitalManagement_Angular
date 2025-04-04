import { Component } from '@angular/core';
import { PatientService } from '../../patient/patient.service';
import { map } from 'rxjs';
import { Patient } from '../../models/patient.model';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-patient-profile',
  standalone: false,
  templateUrl: './view-patient-profile.component.html',
  styleUrl: './view-patient-profile.component.css',
})
export class ViewPatientProfileComponent {
  patient!: Patient;
  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: ActivatedRoute
  ) {
    const id = +this.router.snapshot.paramMap.get('id')!;
    console.log(id);

    this.doctorService
      .getPatient(id)
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.patient = data;
        // this.route.navigate(['/viewProfile', id]);
      });
  }
}
