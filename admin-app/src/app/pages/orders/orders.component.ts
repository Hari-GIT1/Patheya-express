import {

  Component,

  OnInit

} from '@angular/core';

import { OrderService }
from 'src/app/core/services/order.service';

import { SocketService }
from 'src/app/core/services/socket.service';

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

  loading = true;

  orders: any[] = [];

  search = '';

selectedStatus = '';

filteredOrders: any[] = [];

  columns = [

    {
      key: '_id',
      label: 'Order ID'
    },

    {
      key: 'status',
      label: 'Status',
      type: 'status'
    },

    {
      key: 'paymentStatus',
      label: 'Payment'
    },

    {
      key: 'total',
      label: 'Amount'
    }

  ];
  selectedOrder: any = null;
  constructor(

    private orderService:
      OrderService,

    private socketService:
      SocketService

  ) {}

  ngOnInit(): void {

    this.loadOrders();

    this.initializeRealtime();

  }

  loadOrders() {

    this.orderService
      .getOrders()
      .subscribe({

        next: (res: any) => {

          this.orders =
            res.data || [];

          this.applyFilters();

          this.loading =
            false;

        },

        error: (err) => {

          console.error(err);

          this.loading =
            false;

        }

      });

  }
  applyFilters() {

    let filtered =
      [...this.orders];
  
    // SEARCH
    if (this.search) {
  
      filtered =
        filtered.filter(
          (order) =>
  
            order._id
              ?.toLowerCase()
              .includes(
                this.search
                  .toLowerCase()
              )
        );
  
    }
  
    // STATUS
    if (this.selectedStatus) {
  
      filtered =
        filtered.filter(
          (order) =>
  
            order.status ===
            this.selectedStatus
        );
  
    }
  
    this.filteredOrders =
      filtered;
  
  }
  initializeRealtime() {

    this.socketService
      .connectAdmin();

    this.socketService
      .onNewOrder(() => {

        this.loadOrders();

      });

      this.socketService
      .onOrderUpdated(
        (data: any) => {
    
          this.loadOrders();
    
          // UPDATE DRAWER
          if (
            this.selectedOrder &&
            this.selectedOrder._id ===
            data.order._id
          ) {
    
            this.selectedOrder =
              data.order;
    
          }
    
        }
      );

  }
  handleAction(event: any) {

    const order =
      event.row;
  
    const status =
      event.action;
  
    this.orderService
      .updateOrderStatus(
  
        order._id,
  
        status
  
      )
      .subscribe({
  
        next: () => {
  
          // LOCAL UPDATE
          order.status =
            status;
  
          // REFRESH FILTERS
          this.applyFilters();
  
          // UPDATE DRAWER
          if (
            this.selectedOrder &&
            this.selectedOrder._id ===
            order._id
          ) {
  
            this.selectedOrder =
              {
                ...order
              };
  
          }
  
        },
  
        error: (err) => {
  
          console.error(err);
  
        }
  
      });
  
  }
  getActions(order: any) {

    switch (order.status) {
  
      case 'placed':
  
        return [
  
          {
            key: 'accepted',
            label: 'Accept'
          }
  
        ];
  
      case 'accepted':
  
        return [
  
          {
            key: 'preparing',
            label: 'Preparing'
          }
  
        ];
  
      case 'preparing':
  
        return [
  
          {
            key:
              'out_for_delivery',
  
            label: 'Dispatch'
          }
  
        ];
  
      case 'out_for_delivery':
  
        return [
  
          {
            key: 'delivered',
            label: 'Deliver'
          }
  
        ];
  
      default:
  
        return [];
  
    }
  
  }
 openOrder(order: any) {

    this.selectedOrder =
      order;
  
  }
  closeDrawer() {

    this.selectedOrder =
      null;
  
  }

}