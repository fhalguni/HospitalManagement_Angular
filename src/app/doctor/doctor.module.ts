import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorRoutingModule } from './doctor-routing.module';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { CommonModule } from '@angular/common';
import { ViewPatientProfileComponent } from './view-patient-profile/view-patient-profile.component';
import { DoctorComponent } from './doctor.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ManageAppointmentsComponent,
    ViewPatientProfileComponent,
    DoctorComponent,
    ViewProfileComponent,
  ],
  imports: [
    DoctorRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],

  providers: [],
})
export class DoctorModule {}
