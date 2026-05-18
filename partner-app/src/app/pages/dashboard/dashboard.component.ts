import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { SocketService } from 'src/app/core/services/socket.service';

import { AuthService } from 'src/app/core/services/auth.service';

import { OrderService } from 'src/app/core/services/order.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';
import { DiscountService } from 'src/app/core/services/discount.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  totalOrders = 0;

  totalMenuItems = 0;

  runningOrders: any[] = [];

  discounts: any[] = [];

  showDiscountModal = false;
  totalRevenue = 0;

  discountForm = {

    code: '',

    percentage: ''

  };

  constructor(
    private router: Router,
    private orderService: OrderService,
    private menuService: MenuService,
    private discountService: DiscountService
  ) {}

  ngOnInit(): void {

    this.loadOrders();

    this.loadMenu();

  }

  loadOrders(): void {

    this.orderService
      .getOrders()
      .subscribe((res: any) => {
  
        // TOTAL ORDERS
        this.totalOrders = res.length;
  
        // RUNNING ORDERS
        this.runningOrders = res.filter(
          (order: any) =>
            order.status !== 'Delivered'
        );
  
        // TOTAL REVENUE
        this.totalRevenue = res
          .filter(
            (order: any) =>
              order.status === 'Delivered'
          )
          .reduce(
            (sum: number, order: any) =>
              sum + order.total,
            0
          );
  
      });
  
  }

  loadMenu(): void {

    this.menuService
      .getMenu()
      .subscribe((res: any) => {

        this.totalMenuItems = res.length;

      });

  }

  loadDiscounts(): void {

    this.discountService
      .getDiscounts()
      .subscribe((res: any) => {

        this.discounts = res;

      });

  }

  createDiscount(): void {

    this.discountService
      .createDiscount(this.discountForm)
      .subscribe({
  
        next: (res: any) => {
  
          console.log(res);
  
          // ADD TO UI
          this.discounts.unshift(res);
  
          // CLOSE MODAL
          this.showDiscountModal = false;
  
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

}