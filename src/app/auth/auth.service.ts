import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private route: Router) {}

  registerUser(data: any) {
    return this.http.post('http://localhost:9000/auth/register', data);
  }

  logInUser(email: string, password: string) {
    return this.http.post('http://localhost:9000/auth/login', {
      email,
      password,
    });
  }
  isUserAuthenticated() {
    const userAuthenticated = localStorage.getItem('token');
    if (!userAuthenticated) {
      alert('Please Login First');

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
