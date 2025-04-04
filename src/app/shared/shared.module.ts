import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LoginSharedComponent } from './login-shared/login-shared.component';

@NgModule({
  declarations: [LoginSharedComponent],
  imports: [ReactiveFormsModule],
  exports: [LoginSharedComponent],
  providers: [],
})
export class SharedModule {}
