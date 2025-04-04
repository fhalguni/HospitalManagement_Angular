import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorRoutingModule } from './doctor-routing.module';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { CommonModule } from '@angular/common';
import { ViewPatientProfileComponent } from './view-patient-profile/view-patient-profile.component';

@NgModule({
  declarations: [ManageAppointmentsComponent, ViewPatientProfileComponent],
  imports: [
    DoctorRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],

  providers: [],
})
export class DoctorModule {}
