import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BookAppointmentComponent } from './patient/book-appointment-list/book-appointment.component';
import { authInterceptor } from './interceptor/auth.interceptor';
import { AddBookAppointmentComponent } from './patient/add-book-appointment/add-book-appointment.component';
import { PatientModule } from './patient/patient.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookAppointmentComponent,
    AddBookAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PatientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
