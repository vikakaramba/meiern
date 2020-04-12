import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import Socket = SocketIOClient.Socket;

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly socket: Socket;

  constructor() {
    this.socket = io(environment.serverUrl);
  }

  public getSocket(): Socket {
    return this.socket;
  }
}
