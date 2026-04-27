import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RestaurantDashboardComponent,
    MenuManagementComponent,
    RestaurantOrdersComponent,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestaurantModule { }
