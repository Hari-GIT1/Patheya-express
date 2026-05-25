import {

  Component,
  OnInit

} from '@angular/core';

import { OrdersService }
from '../../../../core/services/orders.service';

@Component({

  selector: 'app-orders-list',

  templateUrl:
    './orders-list.component.html',

  styleUrls:
    ['./orders-list.component.scss']

})
export class OrdersListComponent
implements OnInit {

  loading = false;

  page = 1;

  limit = 10;

  total = 0;

  data: any[] = [];

  columns = [

    {

      key: '_id',

      label: 'Order ID'

    },

    {

      key: 'customerName',

      label: 'Customer'

    },

    {

      key: 'totalAmount',

      label: 'Amount'

    },

    {

      key: 'status',

      label: 'Status'

    }

  ];

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

        page: this.page,

        limit: this.limit

      })
      .subscribe({

        next: (response) => {

          this.loading = false;

          this.data =
            response.data.orders;

          this.total =
            response.data.total;

        },

        error: (error) => {

          this.loading = false;

          console.error(error);

        }

      });

  }

  onPageChange(
    page: number
  ): void {

    this.page = page;

    this.loadOrders();

  }

}