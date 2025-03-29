import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:9000'); // Replace with your server URL
  }

  // Listen for events
  onEvent(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }

  // Emit events (if needed)
  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Disconnect socket (if needed)
  disconnect(): void {
    this.socket.disconnect();
  }
}
