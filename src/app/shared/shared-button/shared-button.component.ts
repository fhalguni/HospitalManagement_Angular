import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  standalone: false,
  templateUrl: './shared-button.component.html',
  styleUrl: './shared-button.component.css',
})
export class SharedButtonComponent {
  @Input({ required: true }) btnTitle!: string;
  @Input({ required: true }) btnStyle!: string;

  @Output() send = new EventEmitter();
}
