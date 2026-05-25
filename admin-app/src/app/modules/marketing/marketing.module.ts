import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';
import { MarketingDashboardComponent } from './pages/marketing-dashboard/marketing-dashboard.component';


@NgModule({
  declarations: [
    MarketingDashboardComponent
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule
  ]
})
export class MarketingModule { }
