import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io(
      environment.api.baseUrl.replace('/api', '')
    );
  }

  joinOrder(orderId: string) {
    this.socket.emit('joinOrderRoom', orderId);
  }

  onOrderStatusUpdate(callback: (data: any) => void) {
    this.socket.on('orderStatusUpdated', callback);
  }
  onRestaurantOrderUpdate(callback: (data: any) => void) {
    this.socket.on('restaurantOrderUpdate', callback);
  }
}