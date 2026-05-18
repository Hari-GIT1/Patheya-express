import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss']
})
export class RestaurantDashboardComponent implements OnInit {

  orders: any[] = [];

  stats = {
    totalOrders: 0,
    revenue: 0,
    pending: 0,
    delivered: 0
  };

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user?._id) return;

    this.loadOrders(user._id);
  }
  constructor(private orderService:OrderService){}

  loadOrders(restaurantId: string) {
    // 🔥 Replace with real API
    // this.orderService.getRestaurantOrders(restaurantId)

    this.orderService.getRestaurantOrders(restaurantId).subscribe(res => {
      this.orders = res;

      this.calculateStats();
    });
  }

  calculateStats() {
    this.stats.totalOrders = this.orders.length;

    this.stats.revenue = this.orders.reduce(
      (sum, o) => sum + o.total, 0
    );

    this.stats.pending = this.orders.filter(
      o => o.status !== 'delivered'
    ).length;

    this.stats.delivered = this.orders.filter(
      o => o.status === 'delivered'
    ).length;
  }
}