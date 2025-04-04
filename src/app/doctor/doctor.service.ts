import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { decodeToken } from '../auth/getToken';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private getDoctorId(): string | null {
    const token = localStorage.getItem('doctorToken');
    return decodeToken(token!);
  }
  constructor(private http: HttpClient, private authService: AuthService) {}
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
    return this.http.get(`http://localhost:7000/patient/getPatientById/${id}`);
  }
}
