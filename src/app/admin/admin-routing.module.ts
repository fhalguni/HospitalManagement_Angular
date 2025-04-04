import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorAuthGuard } from '../auth/doctorAuth.guard';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { AllPatientsComponent } from './all-patients/all-patients.component';
import { PatientsAppointmentsComponent } from './patients-appointments/patients-appointments.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';

const routes: Routes = [
  {
    path: 'allDoctors',
    component: AllDoctorsComponent,
  },
  {
    path: 'allPatients',
    component: AllPatientsComponent,
  },
  {
    path: 'getAppointments/:id',
    component: PatientsAppointmentsComponent,
  },
  {
    path: 'getDoctorAppointments/:id',
    component: DoctorAppointmentsComponent,
  },
  {
    path: 'createDoctor',
    component: AddDoctorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
