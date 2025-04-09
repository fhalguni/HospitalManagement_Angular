import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LoginSharedComponent } from './login-shared/login-shared.component';
import { SharedButtonComponent } from './shared-button/shared-button.component';

@NgModule({
  declarations: [LoginSharedComponent, SharedButtonComponent],
  imports: [ReactiveFormsModule, CommonModule],
  exports: [LoginSharedComponent, SharedButtonComponent],
  providers: [],
})
export class SharedModule {}
