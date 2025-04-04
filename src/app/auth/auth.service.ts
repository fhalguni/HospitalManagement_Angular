import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<any | null>(null);
  user$ = this.user.asObservable();
  constructor(private http: HttpClient, private route: Router) {}

  registerUser(data: any) {
    return this.http.post('http://localhost:8000/auth/register', data);
  }

  logInUser(email: string, password: string) {
    const user1 = this.http.post('http://localhost:8000/auth/login', {
      email,
      password,
    });

    this.user.next(map((res: any) => res.token));
    localStorage.setItem('role', 'patient');

    return user1;
  }
  isUserAuthenticated() {
    const userAuthenticated = localStorage.getItem('role') === 'patient';
    if (!userAuthenticated) {
      alert('Access denied... only patient can access');

      return false;
    } else {
      return true;
    }
  }
  isDoctorAuthenticated() {
    const userAuthenticated = localStorage.getItem('role') === 'doctor';
    if (!userAuthenticated) {
      alert('Access denied... only doctor can access');

      return false;
    } else {
      return true;
    }
  }
  logOut() {
    localStorage.removeItem('token');
    alert('login first');
    this.route.navigate(['/login']);
  }
}
