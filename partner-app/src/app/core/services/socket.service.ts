import { Injectable } from '@angular/core';

import { io, Socket } from 'socket.io-client';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {

    // ✅ REMOVE /api
    const socketUrl =
      environment.apiUrl.replace(
        '/api',
        ''
      );

    this.socket = io(socketUrl);

    this.socket.on('connect', () => {

      console.log(
        'SOCKET CONNECTED:',
        this.socket.id
      );

    });

  }

  // ✅ EMIT
  emit(
    eventName: string,
    data: any
  ) {

    this.socket.emit(
      eventName,
      data
    );

  }

  // ✅ LISTEN
  listen(
    eventName: string
  ): Observable<any> {

    return new Observable((subscriber) => {

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

    });

  }

  // ✅ REMOVE
  removeListener(
    eventName: string
  ) {

    this.socket.off(eventName);

  }

}