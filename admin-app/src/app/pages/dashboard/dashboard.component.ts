import {

  Component,

  OnInit

} from '@angular/core';

import { DashboardService }
from 'src/app/core/services/dashboard.service';
import { SocketService }
from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl:
    './dashboard.component.html',

  styleUrls: [
    './dashboard.component.scss'
  ]
})

export class DashboardComponent
implements OnInit {

  stats: any = {};

  loading = true;
  liveOrders: any[] = [];
  activities: any[] = [];

  constructor(

    private dashboardService:
      DashboardService,
    private socketService:SocketService

  ) {}

  ngOnInit(): void {

    this.loadDashboard();
    this.initializeRealtime();
    this.loadLiveOrders();

  }

  loadDashboard() {

    this.dashboardService
      .getDashboardStats()
      .subscribe({

        next: (res: any) => {

          this.stats =
            res.data;

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
  loadLiveOrders() {

    this.dashboardService
      .getLiveOrders()
      .subscribe({
  
        next: (res: any) => {
  
          this.liveOrders =
            res.data || [];
  
        },
  
        error: (err) => {
  
          console.error(err);
  
        }
  
      });
  
  }
  initializeRealtime() {

    this.socketService
      .connectAdmin();
  
      this.socketService
      .onNewOrder((data: any) => {
    
        console.log(
          'NEW ORDER:',
          data
        );
    
        // REFRESH KPIs
        this.loadDashboard();
    
        // ADD TO LIVE FEED
        this.liveOrders.unshift(
          data.order
        );
        this.addActivity(
          `New order #${data.order._id.slice(-6)} placed`
        );
    
        // LIMIT FEED
        if (
          this.liveOrders.length > 10
        ) {
    
          this.liveOrders.pop();
    
        }
    
      });
  
    this.socketService
      .onOrderUpdated((data:any) => {
  
        console.log(
          'ORDER UPDATED'
        );
  
        this.loadDashboard();
        this.loadLiveOrders();
        this.addActivity(
          `Order #${data.order._id.slice(-6)} updated to ${data.order.status}`
        );
  
      });
  
  }
  addActivity(
    message: string
  ) {
  
    this.activities.unshift({
  
      message,
  
      timestamp: new Date()
  
    });
  
    // LIMIT
    if (
      this.activities.length > 20
    ) {
  
      this.activities.pop();
  
    }
  
  }

}
