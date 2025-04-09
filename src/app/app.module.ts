import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BookAppointmentComponent } from './patient/book-appointment-list/book-appointment.component';
import { authInterceptor } from './interceptor/auth.interceptor';
import { AddBookAppointmentComponent } from './patient/add-book-appointment/add-book-appointment.component';
import { PatientModule } from './patient/patient.module';
import { HomeComponent } from './home/home.component';
import { RescheduleAppointmentComponent } from './patient/reschedule-appointment/reschedule-appointment.component';
import { DoctorModule } from './doctor/doctor.module';

import { LoginSharedComponent } from './shared/login-shared/login-shared.component';
import { SharedModule } from './shared/shared.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { httpErrorInterceptor } from './interceptor/error.interceptor';
import { AllDoctorsComponent } from './admin/all-doctors/all-doctors.component';
import { AdminModule } from './admin/admin.module';
import { GenericTableComponent } from './generic/generic-table/generic-table.component';
import { DoctorAuthInterceptor } from './interceptor/doctor-auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
const config: SocketIoConfig = { url: 'http://localhost:7000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

    HomeComponent,
    RescheduleAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PatientModule,
    DoctorModule,
    SharedModule,
    AdminModule,
    FormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DoctorAuthInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: httpErrorInterceptor, multi: true },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
