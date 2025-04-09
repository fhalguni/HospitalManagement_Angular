// generic-table.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
  standalone: false,
})
export class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { label: string; key: string }[] = [];

  @Input() actions: {
    label: string;
    icon?: string;
    class?: string;
    callback: (id: number) => void;
    disabled?: (item: any) => boolean;
  }[] = [];

  getColumnData(item: any, key: string): any {
    return key.split('.').reduce((obj, part) => obj?.[part], item);
  }
}
