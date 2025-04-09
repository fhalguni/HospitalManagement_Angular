import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: Router,
    private cookie: CookieService
  ) {
    this.cookie.deleteAll();
  }

  ngOnInit() {}

  logOut() {
    this.authService.logOut();
    this.cookie.deleteAll();
    // this.isLoggedIn = false;
    this.route.navigate(['/login']);
  }
}
