import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  completedOrders: any[] = [];

  totalRevenue = 0;

  todayRevenue = 0;

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    this.loadOrders();

  }

  loadOrders(): void {

    this.orderService
      .getOrders()
      .subscribe({

        next: (res: any) => {

          this.completedOrders = res.filter(
            (order: any) =>
          
              order.status?.toLowerCase() === 'delivered'
          );

          // TOTAL REVENUE
          this.totalRevenue = res
            .filter((o: any) => o.status === 'Delivered')
            .reduce(
              (sum: number, order: any) =>
                sum + order.total,
              0
            );

          // TODAY SALES
          const today = new Date().toDateString();

          this.todayRevenue = res
            .filter(
              (o: any) =>
                o.status === 'Delivered' &&
                new Date(o.createdAt)
                  .toDateString() === today
            )
            .reduce(
              (sum: number, order: any) =>
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