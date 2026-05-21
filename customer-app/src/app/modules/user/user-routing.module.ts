import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';

const routes: Routes = [

  // 🏠 HOME (PUBLIC)
  {
    path: '',
    component: HomeComponent
  },

  // 🍽 RESTAURANT MENU
  {
    path: 'restaurant/:id',
    component: RestaurantDetailComponent
  },

  // 🛒 CART
  {
    path: 'cart',
    component: CartComponent,
    data: { role: 'customer' }
  },

  // 💳 CHECKOUT
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { role: 'customer' }
  },

  // 📦 MY ORDERS
  {
    path: 'orders',
    component: OrdersComponent,
    data: { role: 'customer' }
  },

  // 📍 TRACK ORDER
  {
    path: 'track-order/:id',
    component: TrackOrderComponent,
    data: { role: 'customer' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}