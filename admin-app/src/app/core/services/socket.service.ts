import { Injectable }
from '@angular/core';

import {
  io,
  Socket
} from 'socket.io-client';

import { environment }
from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket: Socket;
  private connected = false;

  constructor() {

    this.socket = io(
      environment.socketUrl
    );

  }

  connectAdmin() {

    if (this.connected) {
      return;
    }
  
    this.socket.emit(
      'joinAdminRoom'
    );
  
    this.connected = true;
  
  }

  onNewOrder(callback: any) {

    this.socket.on(
      'adminNewOrder',
      callback
    );

  }

  onOrderUpdated(callback: any) {

    this.socket.on(
      'adminOrderUpdated',
      callback
    );

  }
  removeListeners() {

    this.socket.removeAllListeners(
      'adminNewOrder'
    );
  
    this.socket.removeAllListeners(
      'adminOrderUpdated'
    );
  
  }

}