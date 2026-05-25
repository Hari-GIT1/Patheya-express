import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    OrdersListComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
    
  ]
})
export class OrdersModule { }
