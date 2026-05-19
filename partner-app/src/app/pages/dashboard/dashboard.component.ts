import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Router } from '@angular/router';

import { SocketService }
  from 'src/app/core/services/socket.service';

import { AuthService }
  from 'src/app/core/services/auth.service';

import { OrderService }
  from 'src/app/core/services/order.service';

import { MenuService }
  from 'src/app/core/services/menu.service';

import { DiscountService }
  from 'src/app/core/services/discount.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent
implements OnInit, OnDestroy {

  totalOrders = 0;

  totalMenuItems = 0;

  totalRevenue = 0;

  runningOrders: any[] = [];

  discounts: any[] = [];

  showDiscountModal = false;

  // 🔥 NEW ORDER POPUP
  showOrderPopup = false;

  incomingOrder: any = null;

  discountForm = {

    code: '',

    percentage: ''

  };

  constructor(

    private router: Router,

    private socketService: SocketService,

    private authService: AuthService,

    private orderService: OrderService,

    private menuService: MenuService,

    private discountService: DiscountService

  ) {}

  ngOnInit(): void {

    // 🔥 JOIN RESTAURANT ROOM
    const user =
      this.authService.getUser();

    console.log('OWNER USER:', user);

    if (user?.restaurantId) {

      this.socketService.joinRestaurantRoom(
        user.restaurantId
      );

    }

    // 🔥 LISTEN FOR NEW ORDERS
    this.socketService
      .onNewOrder()
      .subscribe((order: any) => {

        console.log(
          'NEW ORDER RECEIVED:',
          order
        );

        // SHOW POPUP
        this.incomingOrder = order;

        this.showOrderPopup = true;

        // REFRESH DASHBOARD
        this.loadOrders();

      });

    this.loadOrders();

    this.loadMenu();

    this.loadDiscounts();

  }

  ngOnDestroy(): void {

    this.socketService.disconnect();

  }

  // ==============================
  // LOAD ORDERS
  // ==============================
  loadOrders(): void {

    this.orderService
      .getOrders()
      .subscribe((res: any) => {
  
        const orders =
          res.data;
  
        // TOTAL ORDERS
        this.totalOrders =
          orders.length;
  
        // RUNNING ORDERS
        this.runningOrders =
          orders.filter(
  
            (order: any) =>
  
              order.status !==
              'Delivered'
  
          );
  
        // TOTAL REVENUE
        this.totalRevenue =
          orders
  
            .filter(
  
              (order: any) =>
  
                order.status ===
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
  
      });
  
  }

  // ==============================
  // LOAD MENU
  // ==============================
  loadMenu(): void {

    this.menuService
      .getMenu()
      .subscribe((res: any) => {
  
        this.totalMenuItems =
          res.data.length;
  
      });
  
  }

  // ==============================
  // LOAD DISCOUNTS
  // ==============================
  loadDiscounts(): void {

    this.discountService
      .getDiscounts()
      .subscribe((res: any) => {
  
        this.discounts =
          res.data;
  
      });
  
  }
  // ==============================
  // CREATE DISCOUNT
  // ==============================
  createDiscount(): void {

    this.discountService
      .createDiscount(
        this.discountForm
      )
      .subscribe({
  
        next: (res: any) => {
  
          console.log(res);
  
          // ADD TO UI
          this.discounts.unshift(
            res.data
          );
  
          // CLOSE MODAL
          this.showDiscountModal =
            false;
  
          // RESET FORM
          this.discountForm = {
  
            code: '',
  
            percentage: ''
  
          };
  
        },
  
        error: (err) => {
  
          console.log(err);
  
        }
  
      });
  
  }

  // ==============================
  // ACCEPT ORDER
  // ==============================
  acceptOrder(order: any): void {

    console.log(
      'ACCEPT ORDER:',
      order
    );

    this.showOrderPopup = false;

    this.router.navigate(['/orders']);

  }

  // ==============================
  // REJECT POPUP
  // ==============================
  rejectPopup(): void {

    this.showOrderPopup = false;

  }

}