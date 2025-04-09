import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private route: Router) {}
  register() {
    this.route.navigate(['/register']);
  }

  logIn() {
    this.route.navigate(['login']);
  }
}
