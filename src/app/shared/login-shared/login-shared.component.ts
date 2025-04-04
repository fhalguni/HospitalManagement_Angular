import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shared-login',
  standalone: false,
  templateUrl: './login-shared.component.html',
  styleUrl: './login-shared.component.css',
})
export class LoginSharedComponent {
  @Input() formGroupInput!: FormGroup;

  // Input property for submission function
  @Output() onSubmitInput = new EventEmitter();
}
