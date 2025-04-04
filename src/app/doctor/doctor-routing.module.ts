import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorLoginComponent } from './login/login-doctor.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { DoctorAuthGuard } from '../auth/doctorAuth.guard';
import { RouteProtectionGuard } from '../auth/route-protection.guard';
import { ViewPatientProfileComponent } from './view-patient-profile/view-patient-profile.component';

const routes: Routes = [
  {
    path: 'doctor-login',
    canActivate: [RouteProtectionGuard],
    component: DoctorLoginComponent,
  },
  {
    path: 'manageAppointment',
    canActivate: [DoctorAuthGuard],
    component: ManageAppointmentsComponent,
  },
  {
    path: 'viewProfile/:id',
    component: ViewPatientProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
