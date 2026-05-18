import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { TrackOrderComponent } from './track-order/track-order.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    HomeComponent,
    RestaurantListComponent,
    RestaurantDetailComponent,
    CartComponent,
    OrdersComponent,
    CheckoutComponent,
    TrackOrderComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    GoogleMapsModule
  ]
})
export class UserModule { }
