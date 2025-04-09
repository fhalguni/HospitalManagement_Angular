import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { DoctorAuthGuard } from '../auth/doctorAuth.guard';
import { RouteProtectionGuard } from '../auth/route-protection.guard';
import { ViewPatientProfileComponent } from './view-patient-profile/view-patient-profile.component';
import { DoctorComponent } from './doctor.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path: 'doctors',
    component: DoctorComponent,
    children: [
      {
        path: 'manageAppointment',
        canActivate: [DoctorAuthGuard],
        component: ManageAppointmentsComponent,
      },
      {
        path: 'viewProfile/:id',
        canActivate: [DoctorAuthGuard],
        component: ViewPatientProfileComponent,
      },
      {
        path: 'view-profile',
        canActivate: [DoctorAuthGuard],

        component: ViewProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
