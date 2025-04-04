import { NgModule } from '@angular/core';
import { PatientRoutingModule } from './patient.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientProfileComponent } from './profile/patient-profile/patient-profile.component';
import { CommonModule, DatePipe } from '@angular/common';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { AddContactComponent } from './profile/add-contact/add-contact.component';

@NgModule({
  declarations: [PatientProfileComponent, EditProfileComponent, AddContactComponent],
  imports: [PatientRoutingModule, DatePipe, CommonModule, ReactiveFormsModule],
  providers: [],
})
export class PatientModule {}
