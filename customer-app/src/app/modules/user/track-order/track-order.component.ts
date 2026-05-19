import {

  Component,

  OnInit,

  OnDestroy

} from '@angular/core';

import {

  ActivatedRoute

} from '@angular/router';

import {

  OrderService

} from '../../../core/services/order.service';

import {

  SocketService

} from '../../../core/services/socket.service';

@Component({

  selector: 'app-track-order',

  templateUrl:
    './track-order.component.html',

  styleUrls: [
    './track-order.component.scss'
  ]

})

export class TrackOrderComponent
implements OnInit, OnDestroy {

  // ==============================
  // ORDER
  // ==============================
  order: any = null;

  loading = false;

  // ==============================
  // MAP
  // ==============================
  deliveryLocation = {

    lat: 12.9716,

    lng: 77.5946

  };

  destination = {

    lat: 12.9616,

    lng: 77.5846

  };

  zoom = 14;

  directionsService =
    new google.maps
      .DirectionsService();

  directionsResult:
    google.maps
      .DirectionsResult
      | undefined;

  // ==============================
  // INTERVAL
  // ==============================
  private riderInterval: any;

  constructor(

    private route:
      ActivatedRoute,

    private orderService:
      OrderService,

    private socketService:
      SocketService

  ) {}

  // ==============================
  // INIT
  // ==============================
  ngOnInit(): void {

    const orderId =

      this.route
        .snapshot
        .paramMap
        .get('id');

    if (!orderId) return;

    this.loading = true;

    // JOIN SOCKET ROOM
    this.socketService
      .joinOrder(orderId);

    // LOAD ORDER
    this.loadOrder(orderId);

    // LISTEN STATUS UPDATE
    this.listenForUpdates(
      orderId
    );

    // INITIAL ROUTE
    this.drawRoute();

    // FAKE LIVE RIDER
    this.startFakeRiderMovement();

  }

  // ==============================
  // DESTROY
  // ==============================
  ngOnDestroy(): void {

    if (this.riderInterval) {

      clearInterval(
        this.riderInterval
      );

    }

  }

  // ==============================
  // LOAD ORDER
  // ==============================
  loadOrder(
    orderId: string
  ): void {

    this.orderService
      .getOrder(orderId)
      .subscribe({

        next: (res: any) => {

          console.log(
            'ORDER:',
            res
          );

          // STANDARDIZED RESPONSE
          this.order =
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
  // SOCKET LISTENER
  // ==============================
  listenForUpdates(
    orderId: string
  ): void {

    this.socketService
    .onOrderStatusUpdate()
    .subscribe((updated: any) => {

          // HANDLE STANDARDIZED
          const updatedOrder =

            updated.data ||
            updated;

          if (

            updatedOrder._id ===
            orderId

          ) {

            this.order =
              updatedOrder;

          }

        }

      );

  }

  // ==============================
  // TIMELINE STEPS
  // ==============================
  get steps() {

    return [

      {

        key: 'placed',

        label:
          'Order Placed'

      },

      {

        key: 'preparing',

        label:
          'Preparing Food'

      },

      {

        key:
          'out for delivery',

        label:
          'Out for Delivery'

      },

      {

        key: 'delivered',

        label:
          'Delivered'

      }

    ];

  }

  // ==============================
  // PROGRESS INDEX
  // ==============================
  getProgressIndex(
    status: string
  ): number {

    const keys =

      this.steps.map(
        step => step.key
      );

    return keys.indexOf(

      status?.toLowerCase()

    );

  }

  // ==============================
  // ETA
  // ==============================
  get eta(): string {

    if (

      !this.order?.createdAt

    ) return '--';

    const created =

      new Date(
        this.order.createdAt
      ).getTime();

    // 30 MIN ETA
    const etaTime =

      new Date(
        created + 30 * 60000
      );

    return etaTime
      .toLocaleTimeString(
        [],
        {

          hour: '2-digit',

          minute:
            '2-digit'

        }
      );

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
      'out for delivery'

    ) {

      return 'status-out';

    }

    if (value === 'delivered') {

      return 'status-delivered';

    }

    return '';

  }

  // ==============================
  // DRAW ROUTE
  // ==============================
  drawRoute(): void {

    this.directionsService
      .route(

        {

          origin:
            this.deliveryLocation,

          destination:
            this.destination,

          travelMode:
            google.maps
              .TravelMode
              .DRIVING

        },

        (

          result,

          status

        ) => {

          if (

            status === 'OK' &&

            result

          ) {

            this
              .directionsResult =

              result;

          }

        }

      );

  }

  // ==============================
  // FAKE RIDER MOVEMENT
  // ==============================
  startFakeRiderMovement():
  void {

    this.riderInterval =

      setInterval(() => {

        this.deliveryLocation = {

          lat:

            this.deliveryLocation
              .lat +

            (Math.random() - 0.5)
              * 0.001,

          lng:

            this.deliveryLocation
              .lng +

            (Math.random() - 0.5)
              * 0.001

        };

        this.drawRoute();

      }, 3000);

  }

}