import {

  Component,
  OnInit

} from '@angular/core';

import { DashboardService }
from '../../../../core/services/dashboard.service';

@Component({

  selector: 'app-dashboard',

  templateUrl:
    './dashboard.component.html',

  styleUrls:
    ['./dashboard.component.scss']

})
export class DashboardComponent
implements OnInit {

  loading = false;

  stats: any[] = [];

  dashboardData: any = null;

  revenueChartData: any;

  constructor(

    private dashboardService:
      DashboardService

  ) {}

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.loading = true;

    this.dashboardService
      .getDashboardStats()
      .subscribe({

        next: (response) => {

          this.loading = false;

          const data =
            response.data;

          this.dashboardData =
            data;

          // KPI CARDS

          this.stats = [

            {

              title: 'Orders',

              value:
                data.totalOrders

            },

            {

              title: 'Revenue',

              value:
                `₹${data.totalRevenue}`

            },

            {

              title: 'Customers',

              value:
                data.totalUsers

            },

            {

              title: 'Restaurants',

              value:
                data.totalRestaurants

            }

          ];

          // CHART

          this.revenueChartData = {

            labels: [

              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun'

            ],

            datasets: [

              {

                data: [

                  1200,
                  1900,
                  3000,
                  2500,
                  3200,
                  4100,
                  5200

                ],

                label: 'Revenue'

              }

            ]

          };

        },

        error: (error) => {

          this.loading = false;

          console.error(error);

        }

      });

  }

}