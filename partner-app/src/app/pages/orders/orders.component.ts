import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { OrderService } from 'src/app/core/services/order.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent
  implements OnInit, OnDestroy {

  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {

    // ✅ LOAD EXISTING ORDERS
    this.getOrders();

    // ✅ JOIN RESTAURANT ROOM
    const user = this.authService.getUser();

    if (user?.restaurantId) {

      this.socketService.emit(
        'joinRestaurantRoom',
        user.restaurantId
      );

    }

    // ✅ REALTIME NEW ORDER
    this.socketService.listen('newOrder')
      .subscribe((order: any) => {

        console.log('NEW ORDER:', order);

        this.orders.unshift(order);

      });

    // ✅ REALTIME STATUS UPDATE
    this.socketService.listen('orderStatusUpdated')
      .subscribe((updatedOrder: any) => {

        const index = this.orders.findIndex(
          o => o._id === updatedOrder._id
        );

        if (index !== -1) {

          this.orders[index] = updatedOrder;

        }

      });

  }

  ngOnDestroy(): void {

    this.socketService.removeListener('newOrder');

    this.socketService.removeListener(
      'orderStatusUpdated'
    );

  }

  // ✅ GET ORDERS
  getOrders(): void {

    this.orderService
      .getOrders()
      .subscribe({

        next: (res: any) => {

          this.orders = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ✅ UPDATE STATUS
  updateStatus(
    id: string,
    status: string
  ): void {

    this.orderService
      .updateStatus(id, status)
      .subscribe({

        next: () => {

          this.getOrders();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ✅ FILTER BY STATUS
  getOrdersByStatus(status: string) {

    return this.orders.filter(
      order => order.status === status
    );

  }

  // ✅ ORDER TIMER
  getMinutes(order: any): number {

    const created =
      new Date(order.createdAt).getTime();

    const now = Date.now();

    return Math.floor(
      (now - created) / 60000
    );

  }

}