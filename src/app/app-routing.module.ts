import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { BookAppointmentComponent } from './patient/book-appointment-list/book-appointment.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { RouteProtectionGuard } from './auth/route-protection.guard';
import { DoctorAuthGuard } from './auth/doctorAuth.guard';

const routes: Routes = [
  {
    path: 'register',
    canActivate: [RouteProtectionGuard],
    component: RegisterComponent,
  },
  {
    path: 'login',
    canActivate: [RouteProtectionGuard],
    component: LoginComponent,
  },
  {
    path: 'bookAppointment',
    // canActivate: [authGuard],
    component: BookAppointmentComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'patients',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
