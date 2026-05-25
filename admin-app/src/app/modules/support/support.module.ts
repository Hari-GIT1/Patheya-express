import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportDashboardComponent } from './pages/support-dashboard/support-dashboard.component';


@NgModule({
  declarations: [
    SupportDashboardComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
