import { Component, OnInit } from '@angular/core';
import { OrderNotificationService } from '../../../core/services/order-notification.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {

  orders: any[] = [];

  constructor(
    private notify: OrderNotificationService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.notify.orders$.subscribe(data => {
      this.orders = data;
    });
  }

  update(orderId: string, status: string) {
    this.orderService.updateOrderStatus(orderId, status)
      .subscribe(() => {
        this.notify.removeOrder(orderId);
      });
  }

  close(orderId: string) {
    this.notify.removeOrder(orderId);
  }
}