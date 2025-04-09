import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-profile',
  standalone: false,
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css',
})
export class ViewProfileComponent {
  doctor: any;
  showPasswordDialog = false;
  passwordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  constructor(
    private doctorService: DoctorService,
    private cookie: CookieService,
    private route: Router
  ) {
    this.doctorService
      .getDoctorProfile()
      .pipe(map((res: any) => res.data))
      .subscribe((data) => {
        this.doctor = data;
        console.log(data);
      });
  }
  updatePassword() {
    this.doctorService
      .changePassword(this.passwordForm.controls.password.value!)
      .subscribe(
        (data) => {
          console.log('success', data);
          Swal.fire({
            icon: 'success',
            title: 'Password Updated',
            text: 'Your password has been successfully updated!',
            confirmButtonText: 'OK',
          });
          this.cookie.delete('token');
          this.cookie.delete('role');
          this.showPasswordDialog = false;
          Swal.fire({
            icon: 'success',
            title: 'Log In Again with new Credentials',
            text: 'You are logged out successfully',
            confirmButtonText: 'OK',
          });
          this.route.navigate(['/login']);
        },
        (error) => {
          console.error('error', error);
          Swal.fire({
            icon: 'error',

            title: 'Update Failed',
            text: 'There was an error updating your password. Please try again!',
            confirmButtonText: 'Retry',
          });
        }
      );
  }
  closePasswordDialog() {
    this.showPasswordDialog = false;
  }
  showDialogBox() {
    this.showPasswordDialog = true;
  }
}
