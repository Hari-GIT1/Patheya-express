import {

  Component,

  OnInit,

  OnDestroy,

  NgZone

} from '@angular/core';

import {

  Subject,

  takeUntil

} from 'rxjs';

import {

  OrderService

} from 'src/app/core/services/order.service';

import {

  AuthService

} from 'src/app/core/services/auth.service';

import {

  SocketService

} from 'src/app/core/services/socket.service';

@Component({

  selector: 'app-orders',

  templateUrl: './orders.component.html',

  styleUrls: ['./orders.component.scss']

})

export class OrdersComponent
implements OnInit, OnDestroy {

  orders: any[] = [];

  loading = false;

  currentPage = 1;

  limit = 10;

  selectedStatus = '';

  search = '';

  totalOrders = 0;

  private destroy$ =
    new Subject<void>();

  constructor(

    private orderService:
      OrderService,

    private authService:
      AuthService,

    private socketService:
      SocketService,

    private ngZone:
      NgZone

  ) {}

  ngOnInit(): void {

    this.getOrders();

    const user =
      this.authService.getUser();

    if (user?.restaurantId) {

      this.socketService
        .joinRestaurantRoom(

          user.restaurantId

        );

    }

    // ==============================
    // NEW ORDER SOCKET
    // ==============================
    this.socketService

      .onNewOrder()

      .pipe(
        takeUntil(
          this.destroy$
        )
      )

      .subscribe((order: any) => {

        this.ngZone.run(() => {

          if (
            this.currentPage === 1
          ) {

            this.orders.unshift(
              order
            );

          }

        });

      });

    // ==============================
    // STATUS UPDATE SOCKET
    // ==============================
    this.socketService

      .onOrderStatusUpdate()

      .pipe(
        takeUntil(
          this.destroy$
        )
      )

      .subscribe((updated: any) => {

        const index =
          this.orders.findIndex(

            o =>

              o._id ===
              updated._id

          );

        if (index !== -1) {

          this.ngZone.run(() => {

            this.orders[index] =
              updated;

          });

        }

      });

  }

  // ==============================
  // GET ORDERS
  // ==============================
  getOrders(): void {

    this.loading = true;

    this.orderService

      .getOrders({

        page:
          this.currentPage,

        limit:
          this.limit,

        status:
          this.selectedStatus,

        search:
          this.search

      })

      .subscribe({

        next: (res: any) => {

          this.orders =
            res.data;

          this.totalOrders =
            res.total || 0;

          this.loading =
            false;

        },

        error: (err) => {

          console.log(err);

          this.loading =
            false;

        }

      });

  }

  // ==============================
  // UPDATE STATUS
  // ==============================
  updateStatus(

    id: string,

    status: string

  ): void {

    this.orderService

      .updateStatus(

        id,

        status

      )

      .subscribe({

        next: (res: any) => {

          const updated =
            res.data;

          const index =
            this.orders.findIndex(

              order =>

                order._id ===
                updated._id

            );

          if (index !== -1) {

            this.orders[index] =
              updated;

          }

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
// ==============================
// FILTER ORDERS BY STATUS
// ==============================
getOrdersByStatus(
  status: string
): any[] {

  return this.orders.filter(

    order =>

      order.status
        ?.toLowerCase() ===
      status.toLowerCase()

  );

}

  // ==============================
  // STATUS FILTER
  // ==============================
  onStatusChange(
    status: string
  ): void {

    this.selectedStatus =
      status;

    this.currentPage = 1;

    this.getOrders();

  }

  // ==============================
  // SEARCH
  // ==============================
  onSearch(): void {

    this.currentPage = 1;

    this.getOrders();

  }

  // ==============================
  // PAGINATION
  // ==============================
  nextPage(): void {

    this.currentPage++;

    this.getOrders();

  }

  prevPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;

      this.getOrders();

    }

  }

  // ==============================
  // ORDER TIMER
  // ==============================
  getMinutes(
    order: any
  ): number {

    const created =

      new Date(
        order.createdAt
      ).getTime();

    const now =
      Date.now();

    return Math.floor(

      (now - created) / 60000

    );

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

    this.socketService
      .removeListener(
        'newOrder'
      );

    this.socketService
      .removeListener(
        'orderStatusUpdated'
      );

  }

}