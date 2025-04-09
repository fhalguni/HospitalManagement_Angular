import { NgModule } from '@angular/core';
import { PatientRoutingModule } from './patient.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientProfileComponent } from './profile/patient-profile/patient-profile.component';
import { CommonModule, DatePipe } from '@angular/common';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { AddContactComponent } from './profile/add-contact/add-contact.component';
import { PatientComponent } from './patient.component';
import { MatDialogModule } from '@angular/material/dialog';

import { GenericTableComponent } from '../generic/generic-table/generic-table.component';
import { AddBookAppointmentComponent } from './add-book-appointment/add-book-appointment.component';
import { BookAppointmentComponent } from './book-appointment-list/book-appointment.component';
import { SharedModule } from '../shared/shared.module';
import { GenericModule } from '../generic/generic.module';
@NgModule({
  declarations: [
    PatientProfileComponent,
    EditProfileComponent,
    AddContactComponent,
    PatientComponent,
    AddBookAppointmentComponent,
    BookAppointmentComponent,
  ],
  imports: [
    PatientRoutingModule,
    DatePipe,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    GenericModule,
    FormsModule,
    SharedModule,
  ],
  providers: [],
})
export class PatientModule {}
