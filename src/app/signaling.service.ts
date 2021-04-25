import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalingService {
  constructor(private socket: Socket) {}

  getMessages(): Observable<any> {
    return this.socket.fromEvent('message');
  }

  sendMessage(payload): void {
    this.socket.emit('send-message', payload);
  }
}
