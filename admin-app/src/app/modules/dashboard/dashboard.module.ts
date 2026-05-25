import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule }from '../../shared/shared.module';
import { RecentOrdersComponent } from './components/recent-orders/recent-orders.component';
import { NgChartsModule } from 'ng2-charts';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { PendingRestaurantsComponent } from './components/pending-restaurants/pending-restaurants.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { LiveOrdersComponent } from './components/live-orders/live-orders.component';
import { PendingApprovalsComponent } from './components/pending-approvals/pending-approvals.component';
import { ActivityTimelineComponent } from './components/activity-timeline/activity-timeline.component';
import { RevenueOverviewComponent } from './components/revenue-overview/revenue-overview.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RecentOrdersComponent,
    RevenueChartComponent,
    PendingRestaurantsComponent,
    QuickActionsComponent,
    LiveOrdersComponent,
    PendingApprovalsComponent,
    ActivityTimelineComponent,
    RevenueOverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
