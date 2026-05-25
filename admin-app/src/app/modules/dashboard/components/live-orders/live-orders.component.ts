import {

  Component,
  OnInit

} from '@angular/core';

import { OrdersService }
from '../../../../core/services/orders.service';

@Component({

  selector: 'app-live-orders',

  templateUrl:
    './live-orders.component.html',

  styleUrls:
    ['./live-orders.component.scss']

})
export class LiveOrdersComponent
implements OnInit {

  orders: any[] = [];

  loading = false;

  constructor(

    private ordersService:
      OrdersService

  ) {}

  ngOnInit(): void {

    this.loadOrders();

  }

  loadOrders(): void {

    this.loading = true;

    this.ordersService
      .getOrders({

        limit: 5,

        sortBy: 'createdAt',

        order: 'desc'

      })
      .subscribe({

        next: (response) => {

          this.loading = false;

          this.orders =
            response.data.orders;

        },

        error: () => {

          this.loading = false;

        }

      });

  }

}