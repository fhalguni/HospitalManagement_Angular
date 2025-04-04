import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';
// Use a utility file to decode the token
import { map, Observable } from 'rxjs';
import { decodeToken } from '../auth/getToken';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  private api = 'http://localhost:8000';

  // Safely fetch the patient ID
  private getPatientId(): string | null {
    const token = localStorage.getItem('token');
    return decodeToken(token!);
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.api}/doctor/getAllDoctor`);
  }

  getAllAppointments(): Observable<any[]> {
    const patientId = this.getPatientId(); // Fetch dynamically
    return this.http.get<any[]>(
      `${this.api}/patient/getAllAppointment/${patientId}`
    );
  }

  bookAppointment(data: any): Observable<any> {
    const patientId = this.getPatientId(); // Fetch dynamically
    return this.http.post(
      `${this.api}/book/bookAppointment/${patientId}`,
      data
    );
  }

  cancelAppointment(appointmentId: number): Observable<any> {
    const patientId = this.getPatientId(); // Fetch dynamically
    const url = `${this.api}/patient/cancelAppointment/${patientId}`;
    console.log(patientId);
    return this.http.delete(url, { body: { appointmentId } });
  }

  rescheduleAppointment(appointmentId: number, data: any) {
    const patientId = this.getPatientId();
    return this.http.put(
      `${this.api}/patient/rescheduleAppointment/${patientId}`,
      { appointmentId, ...data }
    );
  }

  getAppointment(appointmentId: number) {
    return this.http.get<Appointment>(
      `${this.api}/patient/getAppointment/${appointmentId}`
    );
  }

  getPatient() {
    const patientId = this.getPatientId();
    return this.http.get(`${this.api}/patient/getPatientById/${patientId}`);
  }

  editProfile(data: any) {
    const patientId = this.getPatientId();
    console.log(patientId);

    return this.http.put(
      `${this.api}/patient/updatePatient/${patientId}`,
      data
    );
  }

  addEmergencyContact(data: any) {
    const patientId = this.getPatientId();
    return this.http.post(
      `${this.api}/contact/addNewContact/${patientId}`,
      data
    );
  }
  deleteEmergencyContact(contactId: number) {
    const patientId = this.getPatientId();
    console.log(contactId);

    return this.http.delete(`${this.api}/contact/deleteContact/${patientId}`, {
      body: { contactId },
    });
  }
}
