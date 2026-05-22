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
  private connect(): void {

    const socketUrl =

      environment.api.baseUrl
        .replace('/api', '');

    this.socket = io(

      socketUrl,

      {

        transports: [
          'websocket'
        ],

        reconnection: true,

        reconnectionAttempts: 5,

        reconnectionDelay: 1000

      }

    );

    // CONNECTED
    this.socket.on(

      'connect',

      () => {

        console.log(

          'SOCKET CONNECTED:',

          this.socket.id

        );

      }

    );

    // DISCONNECTED
    this.socket.on(

      'disconnect',

      () => {

        console.log(
          'SOCKET DISCONNECTED'
        );

      }

    );

  }

  // ==============================
  // JOIN ORDER ROOM
  // ==============================
  joinOrder(

    orderId: string

  ): void {

    this.socket.emit(

      'joinOrderRoom',

      orderId

    );

  }

  // ==============================
  // JOIN RESTAURANT ROOM
  // ==============================
  joinRestaurant(

    restaurantId: string

  ): void {

    this.socket.emit(

      'joinRestaurantRoom',

      restaurantId

    );

  }

  // ==============================
  // ORDER STATUS UPDATE
  // ==============================
  onOrderStatusUpdate() {

    return new Observable<any>(
      observer => {
  
        this.socket.on(
  
          'orderStatusUpdated',
  
          (data) => {
  
            observer.next(data);
  
          }
  
        );
  
      }
  
    );
  
  }

  // ==============================
  // NEW ORDER
  // ==============================
  onNewOrder():
  Observable<any> {

    return new Observable(

      observer => {

        this.socket.on(

          'newOrder',

          (data) => {

            observer.next(data);

          }

        );

      }

    );

  }

  // ==============================
  // RESTAURANT ORDER UPDATE
  // ==============================
  onRestaurantOrderUpdate():
  Observable<any> {

    return new Observable(

      observer => {

        this.socket.on(

          'restaurantOrderUpdate',

          (data) => {

            observer.next(data);

          }

        );

      }

    );

  }
  // ==============================
// DELIVERY LOCATION UPDATED
// ==============================

onDeliveryLocationUpdate() {

  return new Observable(

    (observer) => {

      this.socket.on(

        'deliveryLocationUpdated',

        (data: any) => {

          observer.next(data);

        }

      );

    }

  );

}

  // ==============================
  // GENERIC EMIT
  // ==============================
  emit(

    event: string,

    data: any

  ): void {

    this.socket.emit(

      event,

      data

    );

  }

  // ==============================
  // GENERIC LISTENER
  // ==============================
  listen(

    event: string

  ): Observable<any> {

    return new Observable(

      observer => {

        this.socket.on(

          event,

          (data) => {

            observer.next(data);

          }

        );

      }

    );

  }

  // ==============================
  // REMOVE LISTENER
  // ==============================
  removeListener(

    event: string

  ): void {

    this.socket.off(event);

  }

  // ==============================
  // DISCONNECT
  // ==============================
  disconnect(): void {

    if (this.socket) {

      this.socket.disconnect();

    }

  }

}