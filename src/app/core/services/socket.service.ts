import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  joinOrder(orderId: string) {
    this.socket.emit('joinOrderRoom', orderId);
  }

  joinRestaurant(restaurantId: string) {
    this.socket.emit('joinRestaurant', restaurantId);
  }
  onOrderStatusUpdate(callback: (data: any) => void) {
    this.socket.on('orderStatusUpdated', callback);
  }
  onRestaurantOrderUpdate(callback: (data: any) => void) {
    this.socket.on('restaurantOrderUpdate', callback);
  }
}