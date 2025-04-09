import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppointmentComponent } from './book-appointment-list/book-appointment.component';
import { AddBookAppointmentComponent } from './add-book-appointment/add-book-appointment.component';
import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-appointment.component';
import { PatientProfileComponent } from './profile/patient-profile/patient-profile.component';
import { authGuard } from '../auth/auth.guard';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { AddContactComponent } from './profile/add-contact/add-contact.component';
import { PatientComponent } from './patient.component';

const routes: Routes = [
  {
    path: 'patients',
    component: PatientComponent,
    children: [
      {
        path: 'bookAppointment',
        // canActivate: [authGuard],
        component: BookAppointmentComponent,
      },
      {
        path: 'addBookAppointment',
        canActivate: [authGuard],
        component: AddBookAppointmentComponent,
      },
      {
        path: 'reshedule/:id',
        canActivate: [authGuard],
        component: RescheduleAppointmentComponent,
      },
      {
        path: 'patient-profile',
        canActivate: [authGuard],
        component: PatientProfileComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'addEmergencyContact',
        component: AddContactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
