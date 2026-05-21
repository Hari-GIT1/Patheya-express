import {

  Component,

  OnInit

} from '@angular/core';

import {

  Router

} from '@angular/router';

import {

  OrderService

} from '../../../core/services/order.service';

@Component({

  selector: 'app-orders',

  templateUrl:
    './orders.component.html',

  styleUrls: [
    './orders.component.scss'
  ]

})

export class OrdersComponent
implements OnInit {

  orders: any[] = [];

  loading = false;

  constructor(

    private orderService:
      OrderService,

    private router:
      Router

  ) {}

  // ==============================
  // INIT
  // ==============================
  ngOnInit(): void {

    const user = JSON.parse(
  
      localStorage.getItem(
        'user'
      ) || '{}'
  
    );
  
    console.log(
      'LOGGED USER:',
      user
    );
  
    if (!user?.id) {
  
      return;
  
    }
  
    this.orderService
      .getUserOrders(user.id)
      .subscribe({
  
        next: (res: any) => {
  
          console.log(
            'USER ORDERS:',
            res
          );
  
          this.orders =
  
            Array.isArray(res)
  
              ? res
  
              : res.data || [];
  
        },
  
        error: (err: any) => {
  
          console.error(err);
  
        }
  
      });
  
  }

  // ==============================
  // LOAD ORDERS
  // ==============================
  loadOrders(): void {

    const user = JSON.parse(

      localStorage.getItem(
        'user'
      ) || '{}'

    );

    if (!user?.id) return;

    this.loading = true;

    this.orderService
      .getUserOrders(
        user.id
      )
      .subscribe({

        next: (res: any) => {

          console.log(
            'USER ORDERS:',
            res
          );
        
          this.orders =
        
            Array.isArray(res)
        
              ? res
        
              : res.data || [];
        
        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

  // ==============================
  // TRACK ORDER
  // ==============================
  trackOrder(
    id: string
  ): void {

    this.router.navigate([

      '/track-order',

      id

    ]);

  }

  // ==============================
  // STATUS CLASS
  // ==============================
  getStatusClass(
    status: string
  ): string {

    const value =
      status?.toLowerCase();

    if (value === 'placed') {

      return 'status-placed';

    }

    if (value === 'preparing') {

      return 'status-preparing';

    }

    if (

      value ===
      'out_for_delivery'

    ) {

      return 'status-out';

    }

    if (value === 'delivered') {

      return 'status-delivered';

    }

    if (value === 'cancelled') {

      return 'status-cancelled';

    }

    return '';

  }

  // ==============================
  // TRACKBY
  // ==============================
  trackByOrder(
    index: number,
    order: any
  ): string {

    return order.id;

  }

}