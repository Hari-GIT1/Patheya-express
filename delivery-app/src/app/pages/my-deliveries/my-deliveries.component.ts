import {

  Component,

  OnInit

} from '@angular/core';

import {
  OrderService
} from 'src/app/core/services/order.service';

@Component({

  selector: 'app-my-deliveries',

  templateUrl:
    './my-deliveries.component.html',

  styleUrls: [
    './my-deliveries.component.scss'
  ]

})

export class MyDeliveriesComponent
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
  // GET MY DELIVERIES
  // ==============================

  getOrders(): void {

    this.loading = true;

    this.orderService
      .getMyOrders()

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
  // MARK DELIVERED
  // ==============================

  markDelivered(
    orderId: string
  ): void {

    this.orderService
      .markDelivered(orderId)

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