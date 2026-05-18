import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user._id) return;

    this.orderService.getUserOrders(user._id).subscribe({
      next: (res: any[]) => this.orders = res,
      error: (err: any) => console.error(err)
    });
  }

  trackOrder(id: string) {
    this.router.navigate(['/track-order', id]);
  }
}