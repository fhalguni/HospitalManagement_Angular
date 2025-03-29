import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';

import { decodeToken } from '../auth/getToken';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  token = localStorage.getItem('token');
  patientId = decodeToken(this.token!);
  constructor(private http: HttpClient) {}

  getAllDoctors() {
    return this.http.get<Doctor[]>('http://localhost:9000/doctor/getAllDoctor');
  }
  getAllAppointments() {
    return this.http.get<any[]>(
      `http://localhost:9000/patient/getAllAppointment/${this.patientId}`
    );
  }

  bookAppointment(data: any) {
    return this.http.post(
      `http://localhost:9000/book/bookAppointment/${this.patientId}`,
      data
    );
  }
}
