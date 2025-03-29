import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend_HospitalManagementSystem';

  constructor(private authService: AuthService) {}

  logOut() {
    this.authService.logOut();
  }
}
