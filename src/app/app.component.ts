import { Component, OnInit } from '@angular/core';
import { CartService } from './core/services/cart.service';
import { Router } from '@angular/router';
import { SocketService } from './core/services/socket.service';
import { OrderNotificationService } from './core/services/order-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  cartCount = 0;
  total = 0;

  constructor(private cartService: CartService, private router: Router, private socketService: SocketService, private orderNotify: OrderNotificationService) {}

  ngOnInit(): void {
    window.addEventListener('storage', () => {
      window.location.reload();
    });
    this.cartService.cart$.subscribe((items: any[]) => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
      this.total = this.cartService.getTotal();
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user?.restaurantId) {
      this.socketService.joinRestaurant(user.restaurantId);
    }
  
    this.socketService.onRestaurantOrderUpdate((order: any) => {
      console.log('🔥 SOCKET RECEIVED:', order);
  
      if (order?.status === 'placed') {
        this.orderNotify.addOrder(order);
      }
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}