import {

  Component,

  OnInit

} from '@angular/core';

import {

  OrderService

} from 'src/app/core/services/order.service';

@Component({

  selector: 'app-order-history',

  templateUrl: './order-history.component.html',

  styleUrls: ['./order-history.component.scss']

})

export class OrderHistoryComponent
implements OnInit {

  completedOrders: any[] = [];

  totalRevenue = 0;

  todayRevenue = 0;

  constructor(

    private orderService:
      OrderService

  ) {}

  ngOnInit(): void {

    this.loadOrders();

  }

  // ==============================
  // LOAD ORDERS
  // ==============================
  loadOrders(): void {

    this.orderService
      .getOrders()
      .subscribe({

        next: (res: any) => {

          const orders =
            res.data;

          // ==============================
          // COMPLETED ORDERS
          // ==============================
          this.completedOrders =

            orders.filter(

              (order: any) =>

                order.status
                  ?.toLowerCase() ===

                'delivered'

            );

          // ==============================
          // TOTAL REVENUE
          // ==============================
          this.totalRevenue =

            orders

              .filter(

                (o: any) =>

                  o.status ===
                  'Delivered'

              )

              .reduce(

                (

                  sum: number,

                  order: any

                ) =>

                  sum + order.total,

                0

              );

          // ==============================
          // TODAY REVENUE
          // ==============================
          const today =

            new Date()
              .toDateString();

          this.todayRevenue =

            orders

              .filter(

                (o: any) =>

                  o.status ===
                    'Delivered'

                  &&

                  new Date(
                    o.createdAt
                  ).toDateString()

                  === today

              )

              .reduce(

                (

                  sum: number,

                  order: any

                ) =>

                  sum + order.total,

                0

              );

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}