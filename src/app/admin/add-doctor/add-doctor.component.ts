import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-doctor',
  standalone: false,
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css',
})
export class AddDoctorComponent {
  constructor(private adminService: AdminService, private route: Router) {}

  adminForm = new FormGroup({
    name: new FormControl(''),
    speciality: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    degree: new FormControl(''),
  });

  onSubmit() {
    this.adminService.createDoctor(this.adminForm.value).subscribe((data) => {
      console.log('Doctor created', data);
      // Trigger SweetAlert
      Swal.fire({
        title: 'Mail send successfully',
        text: 'Doctor has been created successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      this.route.navigate(['/admin', 'allDoctors']);
    });
  }
}
