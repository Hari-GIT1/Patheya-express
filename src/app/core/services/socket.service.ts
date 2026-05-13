import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://192.168.10.232:3000');
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