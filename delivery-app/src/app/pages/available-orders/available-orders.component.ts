import {

  Component,

  OnInit

} from '@angular/core';

import {
  OrderService
} from 'src/app/core/services/order.service';

@Component({

  selector: 'app-available-orders',

  templateUrl:
    './available-orders.component.html',

  styleUrls: [
    './available-orders.component.scss'
  ]

})

export class AvailableOrdersComponent
implements OnInit {

  orders: any[] = [];

  loading = false;

  constructor(

    private orderService:
      OrderService

  ) {}

  ngOnInit(): void {

    this.getOrders();

  }

  // ==============================
  // GET AVAILABLE ORDERS
  // ==============================

  getOrders(): void {

    this.loading = true;

    this.orderService
      .getAvailableOrders()

      .subscribe({

        next: (res: any) => {

          this.orders =
            res.data;

          this.loading = false;

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

  // ==============================
  // ACCEPT ORDER
  // ==============================

  acceptOrder(
    orderId: string
  ): void {

    this.orderService
      .acceptOrder(orderId)

      .subscribe({

        next: () => {

          this.orders =
            this.orders.filter(

              order =>

                order._id !== orderId

            );

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}