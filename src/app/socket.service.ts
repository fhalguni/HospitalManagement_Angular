import { Injectable, NgZone } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket, private zone: NgZone) {}

  // Listen for events
  joinDoctor(doctorId: number, day: Date, timeSlot: string) {
    this.socket.connect();
    this.socket.emit('slotBook', { doctorId, day, timeSlot });
    console.log('Emitted slotBook event:', { doctorId, day, timeSlot });

    // Subscribe to events after joining the room
    this.onSlotUnavailable();
    this.getUpdatedCount();
  }

  onSlotUnavailable() {
    this.socket.on('slotUnavailable', (data: any) => {
      this.zone.run(() => {
        console.log('Slot Unavailable:', data);
      });
    });
  }

  getUpdatedCount() {
    this.socket.on('patientCountUpdate', (data: any) => {
      this.zone.run(() => {
        console.log('Patient Count Updated:', data);
      });
    });
  }
  disconnect(): void {
    this.socket.disconnect();
  }
}
