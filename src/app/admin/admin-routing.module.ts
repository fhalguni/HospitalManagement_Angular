import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorAuthGuard } from '../auth/doctorAuth.guard';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { AllPatientsComponent } from './all-patients/all-patients.component';
import { PatientsAppointmentsComponent } from './patients-appointments/patients-appointments.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { AdminComponent } from './admin.component';
import { ViewPatientProfileComponent } from './view-patient-profile/view-patient-profile.component';
import { AdminGuard } from '../auth/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'allDoctors',
        canActivate: [AdminGuard],
        component: AllDoctorsComponent,
      },
      {
        path: 'allPatients',
        canActivate: [AdminGuard],

        component: AllPatientsComponent,
      },
      {
        path: 'getAppointments/:id',
        canActivate: [AdminGuard],

        component: PatientsAppointmentsComponent,
      },
      {
        path: 'getDoctorAppointments/:id',
        canActivate: [AdminGuard],
        component: DoctorAppointmentsComponent,
      },
      {
        path: 'createDoctor',
        canActivate: [AdminGuard],

        component: AddDoctorComponent,
      },
      {
        path: 'viewProfile/:id',
        canActivate: [AdminGuard],

        component: ViewPatientProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
