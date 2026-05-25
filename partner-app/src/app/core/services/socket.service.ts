import {
  Injectable
} from '@angular/core';

import {

  io,

  Socket

} from 'socket.io-client';

import {

  Observable

} from 'rxjs';

import {

  environment

} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket!: Socket;

  constructor() {

    this.connect();

  }

  // ==============================
  // CONNECT SOCKET
  // ==============================
  connect(): void {

    this.socket = io(

      environment.socketUrl,

      {

        auth: {

          token:
            localStorage.getItem(
              'token'
            )

        },

        transports: ['websocket'],

        autoConnect: true

      }

    );

    this.socket.on(

      'connect',

      () => {

        console.log(

          'SOCKET CONNECTED:',

          this.socket.id

        );

      }

    );

  }

  // ==============================
  // JOIN RESTAURANT ROOM
  // ==============================
  joinRestaurantRoom(
    restaurantId: string
  ): void {

    this.socket.emit(

      'joinRestaurantRoom',

      restaurantId

    );

  }

  // ==============================
  // JOIN ORDER ROOM
  // ==============================
  joinOrderRoom(
    orderId: string
  ): void {

    this.socket.emit(

      'joinOrderRoom',

      orderId

    );

  }

  // ==============================
  // NEW ORDER
  // ==============================
  onNewOrder():
  Observable<any> {

    return new Observable(
      (subscriber) => {

        this.socket.on(

          'newOrder',

          (data) => {

            subscriber.next(
              data
            );

          }

        );

      }
    );

  }

  // ==============================
  // STATUS UPDATE
  // ==============================
  onOrderStatusUpdate():
  Observable<any> {

    return new Observable(
      (subscriber) => {

        this.socket.on(

          'orderStatusUpdated',

          (data) => {

            subscriber.next(
              data
            );

          }

        );

      }
    );

  }

  // ==============================
  // REMOVE LISTENER
  // ==============================
  removeListener(
    eventName: string
  ): void {

    this.socket.off(
      eventName
    );

  }

  // ==============================
  // DISCONNECT
  // ==============================
  disconnect(): void {

    this.socket.disconnect();

  }

}