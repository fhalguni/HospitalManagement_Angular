import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState = new BehaviorSubject<any | null>(null);

  authState$ = this.authState.asObservable();
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private route: Router,
    private cookie: CookieService
  ) {}

  registerUser(data: any) {
    return this.http.post('http://localhost:8000/auth/register', data);
  }

  logInUser(email: string, password: string) {
    const user1 = this.http.post('http://localhost:8000/auth/login', {
      email,
      password,
    });
    return user1;
  }
  isUserAuthenticated() {
    const userAuthenticated = this.cookie.get('role') === 'patient';
    console.log(this.cookie.get('role'));

    console.log({
      userAuthenticated,
    });

    if (!userAuthenticated) {
      alert('Access denied... only patient can access');

      return false;
    } else {
      return true;
    }
  }
  isDoctorAuthenticated() {
    const userAuthenticated = this.cookie.get('role') === 'doctor';
    console.log('doctor', this.cookie.get('role'));

    console.log({
      userAuthenticated,
    });
    if (!userAuthenticated) {
      alert('Access denied... only doctor can access');

      return false;
    } else {
      return true;
    }
  }
  logOut() {
    this.cookie.deleteAll();
    alert('login first');
    this.route.navigate(['/login']);
  }

  isAdminAuthenticated() {
    const adminAuthenticated = this.cookie.get('role') === 'admin';
    if (!adminAuthenticated) {
      alert('Access denied... only Admin can Access');
      return false;
    } else {
      return true;
    }
  }
}
