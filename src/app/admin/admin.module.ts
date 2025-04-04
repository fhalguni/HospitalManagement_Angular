import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AllPatientsComponent } from './all-patients/all-patients.component';
import { PatientsAppointmentsComponent } from './patients-appointments/patients-appointments.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';

@NgModule({
  declarations: [
    AllPatientsComponent,
    PatientsAppointmentsComponent,
    AddDoctorComponent,
    DoctorAppointmentsComponent
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],

  providers: [],
})
export class AdminModule {}
