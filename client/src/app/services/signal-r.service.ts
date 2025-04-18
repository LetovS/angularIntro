import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private socket!: Socket;

  startConnection(userId: number) {
    this.socket = io('https://localhost:3000/filestatushub', {
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket.IO connected');
      this.socket.emit('SubscribeToUser', userId);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
    });
  }

  onFileStatusChanged(callback: (data: any) => void) {
    this.socket.on('FileStatusChanged', callback);
  }

  stopConnection() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
