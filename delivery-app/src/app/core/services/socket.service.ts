import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';

import {
  environment
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  socket: any;

  constructor() {

    this.socket = io(

      environment.socketUrl

    );

  }

  // ==============================
  // JOIN DELIVERY ROOM
  // ==============================

  joinDeliveryRoom(
    deliveryPartnerId: string
  ): void {

    this.socket.emit(

      'joinDeliveryRoom',

      deliveryPartnerId

    );

  }

  // ==============================
  // SEND DELIVERY LOCATION
  // ==============================

  sendLocation(
    data: any
  ): void {

    this.socket.emit(

      'deliveryLocationUpdate',

      data

    );

  }

}