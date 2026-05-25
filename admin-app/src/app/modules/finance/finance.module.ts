import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceDashboardComponent } from './pages/finance-dashboard/finance-dashboard.component';


@NgModule({
  declarations: [
    FinanceDashboardComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
