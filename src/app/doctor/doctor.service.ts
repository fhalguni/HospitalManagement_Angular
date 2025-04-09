import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { decodeToken } from '../auth/getToken';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  doctor = new BehaviorSubject<string | null>(null);
  doctor$ = this.doctor.asObservable();

  private getDoctorId(): string | null {
    const token = this.cookie.get('token');
    return decodeToken(token!);
  }
  updateToken(token: string): void {
    this.doctor.next(token);
  }
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cookie: CookieService
  ) {}
  api = 'http://localhost:8000';
  logInDoctor(data: any) {
    const doctor = this.http.post(`${this.api}/doctor/login-doctor`, data);
    return doctor;
  }

  getAllAppointments() {
    const doctorId = this.getDoctorId();
    return this.http.get(`${this.api}/doctor/AllAppointments/${doctorId}`);
  }

  rejectAppointment(appointmentId: number) {
    const doctorId = this.getDoctorId();
    return this.http.put(`${this.api}/doctor/rejectAppointment/${doctorId}`, {
      appointmentId,
    });
  }

  confirmAppointment(appointmentId: number) {
    const doctorId = this.getDoctorId();
    return this.http.put(`${this.api}/doctor/confirmAppointment/${doctorId}`, {
      appointmentId,
    });
  }
  getPatient(id: number) {
    return this.http.get(`${this.api}/patient/getPatientById/${id}`);
  }

  getDoctorProfile() {
    const doctorId = this.getDoctorId();
    return this.http.get(`${this.api}/doctor/getDoctor/${doctorId}`);
  }
  changePassword(password: string) {
    const doctorId = this.getDoctorId();
    return this.http.put(`${this.api}/doctor/updatePassword/${doctorId}`, {
      password,
    });
  }
}
