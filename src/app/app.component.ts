import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  // In your component
  showPatientsSubMenu = false;
  showDoctorsSubMenu = false;

  isTokenPresent = false;

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isTokenPresent = true;
    }
    this.isTokenPresent = false;
  }
  togglePatientsMenu() {
    this.showPatientsSubMenu = !this.showPatientsSubMenu;
  }

  toggleDoctorsMenu() {
    this.showDoctorsSubMenu = !this.showDoctorsSubMenu;
  }
  title = 'frontend_HospitalManagementSystem';

  constructor(private authService: AuthService) {}

  logOut() {
    this.authService.logOut();
    localStorage.clear();
  }
}
