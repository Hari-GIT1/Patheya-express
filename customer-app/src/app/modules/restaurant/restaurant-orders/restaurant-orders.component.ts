import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.scss']
})
export class RestaurantOrdersComponent implements OnInit, OnDestroy {

  orders: any[] = [];
  intervalId: any;
  audio = new Audio('assets/sounds/ticking_sound.mp3');
  knownOrderIds = new Set<string>();
  selectedTab: string = 'placed';

  playSound() {
    this.audio.currentTime = 0;
    this.audio.play().catch(() => {});
  }
  timers: { [key: string]: number } = {};
  intervals: { [key: string]: any } = {};

  constructor(
    private orderService: OrderService,
    private socketService: SocketService
  ) {}
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
  
    console.log('USER:', user);
  
    if (!user?.restaurantId) {
      console.error('No restaurantId found');
      return;
    }
  
    this.loadOrders(user.restaurantId); // ✅ FIXED
  
    // 🔁 AUTO REFRESH
    this.intervalId = setInterval(() => {
      this.loadOrders(user.restaurantId); // ✅ FIXED
    }, 10000);
  
    // 🔥 SOCKET
    this.socketService.onRestaurantOrderUpdate((updatedOrder: any) => {
  
      const exists = this.orders.find(o => o._id === updatedOrder._id);
  
      if (!exists) {
        this.orders.unshift(updatedOrder);
        this.playSound();
      } else {
        const index = this.orders.findIndex(o => o._id === updatedOrder._id);
        this.orders[index] = updatedOrder;
      }
  
    });
  }
  startTimer(orderId: string, minutes: number = 15) {
    this.timers[orderId] = minutes * 60;
  
    this.intervals[orderId] = setInterval(() => {
      if (this.timers[orderId] > 0) {
        this.timers[orderId]--;
      } else {
        clearInterval(this.intervals[orderId]);
      }
    }, 1000);
  }
  

  loadOrders(restaurantId: string) {
    this.orderService.getRestaurantOrders(restaurantId)
      .subscribe((res: any[]) => {
        console.log('ORDERS FROM API:', res); // 🔥 MUST SHOW DATA
        this.orders = res;
      });
  }

  updateStatus(orderId: string, status: string) {
    this.orderService.updateOrderStatus(orderId, status)
      .subscribe();
  }
  get filteredOrders() {

    if (this.selectedTab === 'preparing') {
      return this.orders.filter(o =>
        o.status === 'accepted' || o.status === 'preparing'
      );
    }
  
    return this.orders.filter(o => o.status === this.selectedTab);
  }
  getCount(status: string) {

    if (status === 'preparing') {
      return this.orders.filter(o =>
        o.status === 'accepted' || o.status === 'preparing'
      ).length;
    }
  
    return this.orders.filter(o => o.status === status).length;
  }

  isNew(order: any) {
    const now = new Date().getTime();
    const created = new Date(order.createdAt).getTime();
  
    return (now - created) < 60000; // 1 min
  }
  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}