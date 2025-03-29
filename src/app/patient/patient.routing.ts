import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppointmentComponent } from './book-appointment-list/book-appointment.component';
import { AddBookAppointmentComponent } from './add-book-appointment/add-book-appointment.component';

const routes: Routes = [
  {
    path: 'bookAppointment',
    component: BookAppointmentComponent,
  },
  {
    path: 'addBookAppointment',
    component: AddBookAppointmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
