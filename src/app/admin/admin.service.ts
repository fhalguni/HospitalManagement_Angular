import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  api = 'http://localhost:8000/admin';

  getAllDoctors() {
    return this.http.get(`${this.api}/getAllDoctors`);
  }

  getAllPatients() {
    return this.http.get(`${this.api}/getAllPatients`);
  }

  deletePatient(id: number) {
    return this.http.put(`${this.api}/deletePatient/${id}`, {});
  }

  getAllAppointmentOfPatient(id: number) {
    return this.http.get(`${this.api}/getAppointmentOfPatient/${id}`);
  }

  deleteDoctor(id: number) {
    return this.http.put(`${this.api}/deleteDoctor/${id}`, id);
  }

  createDoctor(data: any) {
    return this.http.post(`${this.api}/createDoctor`, data);
  }

  getAppointmentOfDoctors(id: number) {
    return this.http.get(`${this.api}/getAppointmentOfDoctor/${id}`);
  }
}
