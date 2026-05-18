import { Injectable } from '@angular/core';

import { io, Socket }
  from 'socket.io-client';

import { Observable }
  from 'rxjs';

import { environment }
  from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket: Socket;

  constructor() {

    // REMOVE /api
    const socketUrl =
      environment.apiUrl.replace(
        '/api',
        ''
      );

    this.socket = io(socketUrl);

    // CONNECTED
    this.socket.on('connect', () => {

      console.log(

        'SOCKET CONNECTED:',

        this.socket.id

      );

    });

  }

  // ==============================
  // JOIN RESTAURANT ROOM
  // ==============================
  joinRestaurantRoom(
    restaurantId: string
  ): void {

    console.log(
      'JOIN ROOM:',
      restaurantId
    );

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
  // NEW ORDER LISTENER
  // ==============================
  onNewOrder(): Observable<any> {

    return new Observable(
      (subscriber) => {

        this.socket.on(

          'newOrder',

          (data) => {

            console.log(
              'NEW ORDER SOCKET:',
              data
            );

            subscriber.next(data);

          }

        );

      }
    );

  }

  // ==============================
  // ORDER STATUS LISTENER
  // ==============================
  onOrderStatusUpdate():
  Observable<any> {

    return new Observable(
      (subscriber) => {

        this.socket.on(

          'orderStatusUpdated',

          (data) => {

            console.log(
              'STATUS UPDATED:',
              data
            );

            subscriber.next(data);

          }

        );

      }
    );

  }

  // ==============================
  // EMIT EVENT
  // ==============================
  emit(
    eventName: string,
    data: any
  ): void {

    this.socket.emit(
      eventName,
      data
    );

  }

  // ==============================
  // GENERIC LISTENER
  // ==============================
  listen(
    eventName: string
  ): Observable<any> {

    return new Observable(
      (subscriber) => {

        this.socket.on(

          eventName,

          (data) => {

            console.log(

              'SOCKET EVENT:',

              eventName,

              data

            );

            subscriber.next(data);

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

    this.socket.off(eventName);

  }

  // ==============================
  // DISCONNECT
  // ==============================
  disconnect(): void {

    this.socket.disconnect();

  }

}